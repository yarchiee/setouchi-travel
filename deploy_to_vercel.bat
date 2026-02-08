@echo off
setlocal
echo ===========================================
echo   Setting up Vercel Deployment...
echo ===========================================

cd /d "%~dp0"

:: 1. Add Node.js to PATH explicitly
if exist "C:\Program Files\nodejs" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
    echo Node.js path added.
)

:: 2. Check Node Version
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not working!
    echo Please ensure Node.js is installed.
    pause
    exit /b 1
)

:: 3. Run Deployment
echo.
echo Running deployment command (npx vercel)...
echo.
echo If asked "Set up and deploy?", type Y
echo.

call npx vercel

echo.
echo ===========================================
echo   Finished! Look for the URL above.
echo ===========================================
pause
