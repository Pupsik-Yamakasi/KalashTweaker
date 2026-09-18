@echo off
chcp 65001 >nul
taskkill /f /im explorer.exe 2>nul
start explorer.exe
echo Done.