@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 or newer is required to launch Helvetic Freight.
  echo Install Node.js from https://nodejs.org/ and run this launcher again.
  pause
  exit /b 1
)
node "%SCRIPT_DIR%scripts\start-playable.mjs" %*
