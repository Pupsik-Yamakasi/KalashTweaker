@echo off
chcp 65001 >nul
taskkill /f /im msedge.exe 2>nul
del /f /q "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" 2>nul
del /f /q "C:\Program Files\Microsoft\Edge\Application\msedge.exe" 2>nul
echo Done. Reinstall Edge from microsoft.com if needed.