@echo off
chcp 65001 >nul
del /q /s "%TEMP%\*" 2>nul
del /q /s "C:\Windows\Temp\*" 2>nul
del /q /s "C:\Windows\Prefetch\*" 2>nul
echo Done.