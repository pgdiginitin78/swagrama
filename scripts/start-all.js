
const { spawn, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const isWindows = process.platform === "win32";

// Support this file being stored either in the project root
// or in a child directory such as scripts/.
const possibleRoots = [
  __dirname,
  path.resolve(__dirname, ".."),
];

const projectRoot =
  possibleRoots.find(
    (dir) =>
      fs.existsSync(path.join(dir, "package.json")) &&
      fs.existsSync(path.join(dir, "Wellness"))
  ) || path.resolve(__dirname, "..");

const backendDir = path.join(projectRoot, "Wellness");
const packagePath = path.join(projectRoot, "package.json");

let backend = null;
let frontend = null;
let shuttingDown = false;

function startProcess(label, command, args, options = {}) {
  console.log(`\n\x1b[36m[${label}]\x1b[0m Starting...`);
  console.log(`[${label}] Command: ${command} ${args.join(" ")}`);
  console.log(`[${label}] Directory: ${options.cwd}`);

  const child = spawn(command, args, {
    cwd: options.cwd,
    stdio: "inherit",
    shell: options.shell ?? false,
    env: process.env,
  });

  child.on("error", (error) => {
    console.error(
      `\x1b[31m[${label}] Startup error:\x1b[0m`,
      error.message
    );
  });

  child.on("exit", (code, signal) => {
    if (shuttingDown) return;

    if (code !== 0 && code !== null) {
      console.error(
        `\x1b[31m[${label}] Exited with code ${code}.\x1b[0m`
      );
    } else if (signal) {
      console.log(`[${label}] Stopped with signal ${signal}.`);
    }
  });

  return child;
}

// ----------------------------------------------------
// 1. Start .NET backend
// ----------------------------------------------------

if (!fs.existsSync(backendDir)) {
  console.error(
    `\x1b[31m[Backend] Wellness folder not found:\x1b[0m ${backendDir}`
  );
} else {
  const directProject = path.join(backendDir, "Wellness.csproj");

  let projectFile = null;

  if (fs.existsSync(directProject)) {
    projectFile = directProject;
  } else {
    const projects = fs
      .readdirSync(backendDir)
      .filter((file) => file.endsWith(".csproj"));

    if (projects.length === 1) {
      projectFile = path.join(backendDir, projects[0]);
    } else {
      console.error(
        "[Backend] Could not identify exactly one .csproj file:",
        projects
      );
    }
  }

  if (projectFile) {
    const args = ["run", "--project", projectFile];

    // Use the http profile only if it is actually defined.
    const launchSettingsPath = path.join(
      backendDir,
      "Properties",
      "launchSettings.json"
    );

    if (fs.existsSync(launchSettingsPath)) {
      try {
        const settings = JSON.parse(
          fs.readFileSync(launchSettingsPath, "utf8")
        );

        if (settings.profiles?.http) {
          args.push("--launch-profile", "http");
        } else {
          console.warn(
            "[Backend] No 'http' launch profile found. Using the default profile."
          );
        }
      } catch (error) {
        console.warn(
          "[Backend] Could not read launchSettings.json:",
          error.message
        );
      }
    }

    backend = startProcess("Backend", "dotnet", args, {
      cwd: backendDir,
      shell: false,
    });
  }
}

// ----------------------------------------------------
// 2. Start React frontend
// ----------------------------------------------------

try {
  const packageJson = JSON.parse(
    fs.readFileSync(packagePath, "utf8")
  );

  if (packageJson.scripts?.dev) {
    // React + Vite
    frontend = startProcess(
      "Frontend",
      isWindows ? "npm.cmd" : "npm",
      ["run", "dev"],
      {
        cwd: projectRoot,
        shell: isWindows,
      }
    );
  } else if (
    packageJson.dependencies?.["react-scripts"] ||
    packageJson.devDependencies?.["react-scripts"]
  ) {
    // Create React App fallback
    frontend = startProcess(
      "Frontend",
      isWindows ? "npx.cmd" : "npx",
      ["react-scripts", "start"],
      {
        cwd: projectRoot,
        shell: isWindows,
      }
    );
  } else {
    console.error(
      "[Frontend] No Vite dev script or react-scripts dependency found. Check package.json."
    );
  }
} catch (error) {
  console.error(
    "[Frontend] Could not read package.json:",
    error.message
  );
}

// ----------------------------------------------------
// 3. Stop both processes when Ctrl+C is pressed
// ----------------------------------------------------

function stopProcess(child) {
  if (!child || !child.pid) return;

  try {
    if (isWindows) {
      execSync(`taskkill /PID ${child.pid} /T /F`, {
        stdio: "ignore",
      });
    } else {
      child.kill("SIGTERM");
    }
  } catch {
    // The process may already have exited.
  }
}

function cleanup() {
  if (shuttingDown) return;

  shuttingDown = true;

  console.log("\nStopping backend and frontend...");

  stopProcess(backend);
  stopProcess(frontend);

  process.exit(0);
}

process.once("SIGINT", cleanup);
process.once("SIGTERM", cleanup);
