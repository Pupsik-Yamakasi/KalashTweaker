@echo off
chcp 65001 >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v TdrDelay /t REG_DWORD /d 60 /f
echo Done. Reboot recommended.