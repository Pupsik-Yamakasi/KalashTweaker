@echo off
chcp 65001 >nul
netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /renew
ipconfig /flushdns
echo Done. Reboot recommended.