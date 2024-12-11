@echo off
echo Running npm install...
call npm install
if %errorlevel% neq 0 (
    echo npm install failed!
    pause
    exit /b %errorlevel%
)

echo Running npm start...
call npm start
if %errorlevel% neq 0 (
    echo npm start failed!
    pause
    exit /b %errorlevel%
)

pause
