const { spawn } = require('child_process');
const path = require('path');

const fs = require('fs');
const backendDir = path.join(__dirname, '..', 'Wellness');
let backend = null;

if (fs.existsSync(backendDir)) {
  console.log('\x1b[36m[Backend]\x1b[0m Starting .NET API on http://localhost:5227 ...');
  backend = spawn('dotnet', ['run', '--launch-profile', 'http'], {
    cwd: backendDir,
    stdio: 'inherit',
    shell: true,
  });
} else {
  console.log('\x1b[33m[Backend]\x1b[0m Wellness directory not found, skipping local backend...');
}

console.log('\x1b[32m[Frontend]\x1b[0m Starting React Development Server...');
const frontend = spawn('npx', ['react-scripts', 'start'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  const killProcess = (child) => {
    if (!child || !child.pid) return;
    try {
      if (process.platform === 'win32') {
        require('child_process').execSync(`taskkill /pid ${child.pid} /T /F 2>nul`);
      } else {
        process.kill(child.pid);
      }
    } catch (e) {}
  };

  killProcess(backend);
  killProcess(frontend);
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
