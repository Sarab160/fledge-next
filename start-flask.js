const { spawn } = require("child_process");
const path = require("path");

// Path to your Python backend folder
const backendPath = path.join(__dirname, "backend");

// Start Flask server
const flaskProcess = spawn("python", ["app.py"], { cwd: backendPath, stdio: "inherit" });

flaskProcess.on("close", (code) => {
  console.log(`Flask server exited with code ${code}`);
});
