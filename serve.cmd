@echo off
REM Serve Anchor on localhost so it can be installed as an app.
REM PWAs are not allowed on file:// - they need http(s), and
REM localhost counts as a secure origin.
cd /d "%~dp0"
echo.
echo   Anchor is running at http://localhost:8777
echo   Install it from the icon in Chrome's address bar.
echo   Close this window to stop the server.
echo.
start "" http://localhost:8777
python -m http.server 8777 --bind 127.0.0.1
