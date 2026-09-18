@echo off
chcp 65001 >nul
ipconfig /flushdns
ipconfig /registerdns
nbtstat -R
arp -d *
netsh int ip reset
echo Done.