@echo off
chcp 65001 >nul
taskkill /f /im explorer.exe 2>nul
del /f /q "%LocalAppData%\IconCache.db" 2>nul
del /f /q "%LocalAppData%\Microsoft\Windows\Explorer\iconcache*" 2>nul
start explorer.exe
echo Done.