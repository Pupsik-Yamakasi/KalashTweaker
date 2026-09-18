@echo off
chcp 65001 >nul
reg delete "HKCU\Control Panel\Mouse" /v SmoothMouseXCurve /f 2>nul
reg delete "HKCU\Control Panel\Mouse" /v SmoothMouseYCurve /f 2>nul
reg add "HKCU\Control Panel\Mouse" /v MouseSpeed /t REG_SZ /d "1" /f
reg add "HKCU\Control Panel\Mouse" /v MouseThreshold1 /t REG_SZ /d "6" /f
reg add "HKCU\Control Panel\Mouse" /v MouseThreshold2 /t REG_SZ /d "10" /f
echo Done.