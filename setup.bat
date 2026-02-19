@echo off
echo ==============================
echo   GOV-AID Setup Script
echo ==============================
echo.

echo [1/4] Installing server dependencies...
cd /d "%~dp0server"
call npm install
if errorlevel 1 (
    echo ERROR: Server npm install failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Installing client dependencies...
cd /d "%~dp0client"
call npm install
if errorlevel 1 (
    echo ERROR: Client npm install failed!
    pause
    exit /b 1
)

echo.
echo ==============================
echo   Setup Complete!
echo ==============================
echo.
echo To start the app:
echo   1. Open a terminal: cd server ^& npm start
echo   2. Open another terminal: cd client ^& npm run dev
echo   3. Open http://localhost:5173
echo.
pause
