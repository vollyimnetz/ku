@echo off
rem Set the path to the Node.js binary
set NODE_PATH=.\node_portable\node-v20.15.0-win-x64

rem Add Node.js binary to the PATH environment variable
set PATH=%NODE_PATH%;%PATH%

rem Change directory to the location of your package.json
cd /d %~dp0

rem Run the npm start script
npm run start