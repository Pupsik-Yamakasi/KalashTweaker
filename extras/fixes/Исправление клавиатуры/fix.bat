@echo off
chcp 65001 >nul
reg add "HKCU\Control Panel\Keyboard" /v KeyboardDelay /t REG_SZ /d "1" /f
reg add "HKCU\Control Panel\Keyboard" /v KeyboardSpeed /t REG_SZ /d "31" /f
echo Done.