@echo off
chcp 65001 >nul
net stop AudioSrv 2>nul
net start AudioSrv
echo Done.