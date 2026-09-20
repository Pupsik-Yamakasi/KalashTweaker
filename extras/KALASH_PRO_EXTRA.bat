@echo off
setlocal EnableExtensions
title KALASH PRO EXTRAS (PRO-твики вне KALASH TWEAKER)
set "SELF=%~dp0"

rem Проверка прав администратора
>nul 2>&1 net session
if errorlevel 1 (
  echo [!] Нужны права администратора. ПКМ по файлу - "Запуск от имени администратора".
  pause
  exit /b 1
)

if /i "%~1"=="-restore" goto :restore

echo.
echo === KALASH PRO EXTRAS - применяю улучшенные PRO-твики ===
echo.

rem ------ Службы: фоновые, не нужные для игр и работы ------
call :svc_set_save WMPNetworkSvc disabled
call :svc_set_save Fax disabled
call :svc_set_save iphlpsvc demand
echo.
rem Опционально (для Smart TV / DLNA / раздачи по сети):
rem call :svc_set_save SSDPSRV demand
rem call :svc_set_save UPnPHost demand

rem ------ Задачи планировщика: Media Center + PcaSvc ------
call :task_disable "Microsoft\Windows\Media Center\mcupdate"
call :task_disable "Microsoft\Windows\Media Center\ActivateWindowsSearch"
call :task_disable "Microsoft\Windows\Media Center\OCURDiscovery"
call :task_disable "Microsoft\Windows\Media Center\PvrWorkItemTimeTrigger"
call :task_disable "Microsoft\Windows\Media Center\PvrAddNewShow"
call :task_disable "Microsoft\Windows\Media Center\PvrRecoveryTask"
call :task_disable "Microsoft\Windows\Media Center\SqlLiteRecoveryTask"
call :task_disable "Microsoft\Windows\Media Center\ehDRMInit"
call :task_disable "Microsoft\Windows\Application Experience\PcaPatchDbTask"
echo.

rem ------ Загрузчик (BCD): точность таймеров ------
bcdedit /set useplatformtick yes
bcdedit /set tscsyncpolicy enhanced
echo.
rem Агрессивно (Win11: отключить VBS для максимального FPS):
rem bcdedit /set vsmlaunchtype off

rem ------ Реестровые PRO-твики ------
if exist "%SELF%KALASH_PRO_EXTRA.reg" (
  reg import "%SELF%KALASH_PRO_EXTRA.reg"
) else (
  echo [ ] Файл KALASH_PRO_EXTRA.reg не найден рядом со скриптом.
)

echo.
echo Готово. Некоторым настройкам нужна ПЕРЕЗАГРУЗКА.
echo Откат: запустите этот файл с параметром  -restore
echo.
pause
exit /b 0

:restore
echo.
echo === KALASH PRO EXTRAS - откат к исходному состоянию ===
echo.
call :svc_restore WMPNetworkSvc
call :svc_restore Fax
call :svc_restore iphlpsvc
echo.
call :task_enable "Microsoft\Windows\Media Center\mcupdate"
call :task_enable "Microsoft\Windows\Media Center\ActivateWindowsSearch"
call :task_enable "Microsoft\Windows\Media Center\OCURDiscovery"
call :task_enable "Microsoft\Windows\Media Center\PvrWorkItemTimeTrigger"
call :task_enable "Microsoft\Windows\Media Center\PvrAddNewShow"
call :task_enable "Microsoft\Windows\Media Center\PvrRecoveryTask"
call :task_enable "Microsoft\Windows\Media Center\SqlLiteRecoveryTask"
call :task_enable "Microsoft\Windows\Media Center\ehDRMInit"
call :task_enable "Microsoft\Windows\Application Experience\PcaPatchDbTask"
echo.

bcdedit /deletevalue useplatformtick
bcdedit /deletevalue tscsyncpolicy
echo.

reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v EnableDeadGWDetect /f
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v TCP1323Opts /f
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v SackOpts /f
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v EnableRSS /f
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v TcpMaxConnectRetransmissions /f
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v DisallowShaking /f
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v SeparateProcess /f
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v ThumbnailLivePreviewHoverTime /f
reg delete "HKCU\Control Panel\Desktop" /v ExtendedUIHoverTime /f
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\CrashControl" /v AutoReboot /f
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\CrashControl" /v CrashDumpEnabled /f
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\FileSystem" /v NtfsDisable8dot3NameCreation /f
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\DeliveryOptimization\Config" /v DODownloadMode /f

echo Откат завершён. Перезагрузите систему.
pause
exit /b 0

:svc_set_save
rem %1 = имя службы, %2 = start (disabled / demand / auto)
sc query "%1" >nul 2>&1 || exit /b 0
if not exist "%SELF%extras_state\" mkdir "%SELF%extras_state"
for /f "tokens=3" %%t in ('reg query "HKLM\SYSTEM\CurrentControlSet\Services\%1" /v Start ^| findstr /i "REG_DWORD"') do >"%SELF%extras_state\%1.txt" echo %%t
sc config "%1" start= %2 1>nul 2>&1
echo     [OK] %1 - %2
exit /b 0

:svc_restore
rem %1 = имя службы
if exist "%SELF%extras_state\%1.txt" (
  set "SV="
  for /f "usebackq delims=" %%t in ("%SELF%extras_state\%1.txt") do set "SV=%%t"
  if defined SV sc config "%1" start= %SV:~2%
  del "%SELF%extras_state\%1.txt"
) else (
  sc config "%1" start= demand
)
sc start "%1" >nul 2>&1
echo     [OK] %1 восстановлен
exit /b 0

:task_disable
rem %1 = имя задачи
schtasks /change /tn "%~1" /disable >nul 2>&1
exit /b 0

:task_enable
rem %1 = имя задачи
schtasks /change /tn "%~1" /enable >nul 2>&1
exit /b 0