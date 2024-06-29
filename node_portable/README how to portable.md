# How to make it portable (WIN)

- ''npm i'' has to be done once on a system with internet connection
- download latest Win64 Version from https://nodejs.org/dist/latest-v20.x/
- store the files in ''node_portable\node-v20.x.x''
- edit ''nodevars.bat''
  - OLD: set "PATH=%APPDATA%\npm;%~dp0;%PATH%"
  - NEW: set "PATH=%~dp0;%PATH%"
- doubleclick the run.bat
- open http://localhost