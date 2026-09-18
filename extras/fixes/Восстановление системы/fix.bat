@echo off
chcp 65001 >nul
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
echo Done.