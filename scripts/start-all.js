const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[36m[Backend]\x1b[0m Starting .NET API on http://localhost:5227 ...');
const backend = spawn('dotnet', ['run', '--launch-profile', 'http'], {
  cwd: path.join(__dirname, '..', 'Wellness'),
  stdio: 'inherit',
  shell: true,
});

console.log('\x1b[32m[Frontend]\x1b[0m Starting React Development Server...');
const frontend = spawn('npx', ['react-scripts', 'start'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  if (backend.pid) {
    try { process.kill(backend.pid); } catch (e) {}
  }
  if (frontend.pid) {
    try { process.kill(frontend.pid); } catch (e) {}
  }
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
