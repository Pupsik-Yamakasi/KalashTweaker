@echo off
chcp 65001 >nul
net stop wuauserv
net stop cryptSvc
net stop bits
net stop msiserver
ren C:\Windows\SoftwareDistribution SoftwareDistribution.old 2>nul
ren C:\Windows\System32\catroot2 catroot2.old 2>nul
net start wuauserv
net start cryptSvc
net start bits
net start msiserver
echo Done.