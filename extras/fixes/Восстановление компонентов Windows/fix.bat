@echo off
chcp 65001 >nul
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
echo Done.