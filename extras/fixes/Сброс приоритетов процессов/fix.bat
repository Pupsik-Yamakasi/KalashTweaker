@echo off
chcp 65001 >nul
wmic process where "name='explorer.exe'" CALL setpriority "normal priority"
wmic process where "name='dwm.exe'" CALL setpriority "normal priority"
echo Done.