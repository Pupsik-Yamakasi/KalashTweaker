TWEAKS = {
    "clean": {
        "Системные кэши": [
            ["Очистить Temp пользователя", "Remove-Item -Path $env:TEMP\\* -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет временные файлы пользователя."],
            ["Очистить Temp Windows", "Remove-Item -Path 'C:\\Windows\\Temp\\*' -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает системную папку Temp."],
            ["Удалить Prefetch", "Remove-Item -Path 'C:\\Windows\\Prefetch\\*' -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет файлы предвыборки."],
            ["Сжатие WinSXS", "Dism /online /Cleanup-Image /StartComponentCleanup /ResetBase", "warn", "Сжимает компоненты Windows (до 15 ГБ). Требует ребут."],
            ["Очистить кэш Windows Update", "net stop wuauserv; net stop bits; Remove-Item -Path 'C:\\Windows\\SoftwareDistribution\\*' -Recurse -Force -ErrorAction SilentlyContinue; net start wuauserv; net start bits", "safe", "Удаляет кэш Windows Update."],
            ["Удалить Crash Dumps", "Remove-Item \"$env:LocalAppData\\CrashDumps\\*\" -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item 'C:\\Windows\\Minidump\\*' -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет дампы памяти при аварийных завершениях."],
            ["Удалить Windows.old", "Remove-Item 'C:\\Windows.old' -Recurse -Force -ErrorAction SilentlyContinue", "warn", "Удаляет папку старой Windows (освобождает 10-30 ГБ)."],
        ],
        "Кэши приложений": [
            ["Очистить кэш NVIDIA", "Get-ChildItem -Path \"$env:LocalAppData\\NVIDIA\\DXCache\",\"$env:LocalAppData\\NVIDIA\\GLCache\" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш шейдеров NVIDIA."],
            ["Очистить кэш AMD", "Remove-Item -Path \"$env:LocalAppData\\AMD\\DxCache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш шейдеров AMD."],
            ["Очистить DirectX Shader Cache", "Remove-Item \"$env:LocalAppData\\D3DSCache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш шейдеров DirectX."],
            ["Очистить кэш Steam", "Remove-Item \"${env:ProgramFiles(x86)}\\Steam\\appcache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш Steam."],
            ["Очистить кэш Epic Games", "Remove-Item \"$env:LocalAppData\\EpicGamesLauncher\\Saved\\webcache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает webcache Epic Games."],
            ["Очистить кэш Discord", "Remove-Item \"$env:AppData\\discord\\Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item \"$env:AppData\\discord\\Code Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит весь кэш Discord."],
            ["Очистить кэш Spotify", "Remove-Item \"$env:LocalAppData\\Spotify\\Storage\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит локальный кэш Spotify."],
            ["Очистить кэш Edge", "Remove-Item \"$env:LocalAppData\\Microsoft\\Edge\\User Data\\Default\\Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит кэш Microsoft Edge."],
            ["Очистить кэш Chrome", "Remove-Item \"$env:LocalAppData\\Google\\Chrome\\User Data\\Default\\Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит кэш Google Chrome."],
            ["Очистить Java кэш", "Remove-Item \"$env:LocalAppData\\Sun\\Java\\Deployment\\cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит кэш Java Runtime."],
            ["Сбросить Microsoft Store", "Start-Process wsreset.exe", "safe", "Сбрасывает кэш Microsoft Store."],
        ],
        "Журналы и прочее": [
            ["Сброс DNS + Winsock", "ipconfig /flushdns; netsh winsock reset", "safe", "Сбрасывает сетевые кэши и сокеты."],
            ["Очистить все журналы Windows", "wevtutil el | ForEach-Object { wevtutil cl $_ 2>$null }", "safe", "Удаляет все логи Event Viewer."],
            ["Очистить Корзину", "Clear-RecycleBin -Force -ErrorAction SilentlyContinue", "safe", "Полностью очищает корзину."],
            ["Очистить кэш иконок", "Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue; Remove-Item \"$env:LocalAppData\\IconCache.db\" -Force -ErrorAction SilentlyContinue; Remove-Item \"$env:LocalAppData\\Microsoft\\Windows\\Explorer\\iconcache*\" -Force -ErrorAction SilentlyContinue; Start-Process explorer", "safe", "Перестраивает кэш иконок и перезапускает Explorer."],
            ["Удалить старые точки восстановления", "vssadmin delete shadows /for=C: /oldest /quiet", "warn", "Удаляет самую старую точку восстановления."],
            ["Очистить Recent Files", "Remove-Item \"$env:AppData\\Microsoft\\Windows\\Recent\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет список недавних документов."],
            ["Очистить Thumbnails", "Remove-Item \"$env:LocalAppData\\Microsoft\\Windows\\Explorer\\thumbcache_*.db\" -Force -ErrorAction SilentlyContinue", "safe", "Удаляет кэш миниатюр проводника."],
            ["Disk Cleanup (sageset)", "cleanmgr /sagerun:1", "safe", "Запускает встроенную очистку диска."],
        ],
    },

    "cpu": {
        "Питание и производительность": [
            ["Ultimate Performance план", "powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null; powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61", "safe", "Максимальная схема питания Windows. Минимальные задержки переключения."],
            ["High Performance план", "powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c", "safe", "Высокая производительность. Хороший баланс скорости и энергии."],
            ["AMD Ryzen Power Plans", "powercfg -duplicatescheme 9935e61f-1661-40c5-ae2f-8495027d5d5d 2>$null; powercfg /setactive 9935e61f-1661-40c5-ae2f-8495027d5d5d 2>$null", "safe", "Оптимальный план питания для AMD Ryzen процессоров.", "amd"],
            ["Отключить парковку ядер", "powercfg /setacvalueindex scheme_current sub_processor CPMINCORES 100; powercfg /setactive scheme_current", "safe", "Все ядра CPU всегда активны, без засыпания."],
            ["Turbo Boost Max", "powercfg /setacvalueindex scheme_current sub_processor PERFBOOSTMODE 1; powercfg /setactive scheme_current", "safe", "Агрессивный турбо-буст: CPU держит максимальную частоту дольше."],
            ["Power Throttling OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' /v PowerThrottlingOff /t REG_DWORD /d 1 /f", "safe", "Отключает троттлинг мощности Windows для фоновых процессов."],
            ["Отключить Fast Startup", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power' /v HiberbootEnabled /t REG_DWORD /d 0 /f", "safe", "Чистая загрузка Windows каждое включение."],
            ["Background Apps OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications' /v GlobalUserDisabled /t REG_DWORD /d 1 /f", "safe", "Запрещает UWP-приложениям работать в фоне."],
            ["Auto-End Task ON", "reg add 'HKCU\\Control Panel\\Desktop' /v AutoEndTasks /t REG_SZ /d 1 /f; reg add 'HKCU\\Control Panel\\Desktop' /v HungAppTimeout /t REG_SZ /d 1000 /f; reg add 'HKCU\\Control Panel\\Desktop' /v WaitToKillAppTimeout /t REG_SZ /d 2000 /f", "safe", "Зависшие приложения закрываются автоматически через 2 сек."],
        ],
        "Таймеры": [
            ["Dynamic Tick OFF", "bcdedit /set disabledynamictick yes", "warn", "Отключает динамический тик — может увеличить энергопотребление."],
            ["TSC Sync Enhanced", "bcdedit /set tscsyncpolicy enhanced", "safe", "Улучшенная синхронизация TSC между ядрами CPU."],
            ["HPET OFF", "bcdedit /set useplatformtick no", "warn", "Отключает HPET — может вызвать проблемы со звуком на некоторых материнских платах."],
            ["Timer Resolution = 0.5ms", "$code = 'using System;using System.Runtime.InteropServices;public class NtTimer{[DllImport(\"ntdll.dll\", SetLastError=true)]public static extern int NtSetTimerResolution(int DesiredResolution, bool SetResolution, out int CurrentResolution);}'; Add-Type -TypeDefinition $code -OutputAssembly $null; $cr = 0; [NtTimer]::NtSetTimerResolution(5000, [ref]$true, [ref]$cr) | Out-Null", "warn", "Таймер ядра 0.5мс — снижает input lag. Действует пока PowerShell работает."],
        ],
        "Приоритеты": [
            ["Win32PrioritySeparation = 38 (Gaming)", "reg add 'HKLM\\System\\CurrentControlSet\\Control\\PriorityControl' /v Win32PrioritySeparation /t REG_DWORD /d 38 /f", "safe", "Foreground boost + короткие кванты — оптимально для игр и быстрого ввода."],
            ["MMCSS Audio = High", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' /v Priority /t REG_DWORD /d 6 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' /v 'Scheduling Category' /t REG_SZ /d High /f", "safe", "Высокий приоритет аудио-потока — без щелчков и пропусков звука."],
            ["DPC Latency Optimization", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v DpcWatchdogProfileOffset /t REG_DWORD /d 10000 /f", "safe", "Снижает DPC-задержки — меньше фризов и прерываний."],
            ["Increase IRQ Priority", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl' /v IRQ8Priority /t REG_DWORD /d 1 /f", "safe", "Повышает приоритет IRQ8 (RTC) — стабильнее таймер."],
        ],
    },

    "ram": {
        "Службы памяти": [
            ["Отключить Superfetch (SysMain)", "Stop-Service SysMain -ErrorAction SilentlyContinue; Set-Service SysMain -StartupType Disabled", "safe", "Отключает предзагрузку приложений в RAM — снижает диск и RAM-использование."],
            ["Отключить Memory Compression", "Disable-MMAgent -MemoryCompression", "safe", "Без сжатия страниц в RAM — меньше CPU, больше прямого потребления."],
            ["Отключить Page Combining", "Disable-MMAgent -PageCombining", "safe", "Отключает объединение одинаковых страниц — предсказуемее для игр."],
            ["Отключить Hibernation", "powercfg /hibernate off", "safe", "Удаляет hiberfil.sys — освобождает место на диске."],
        ],
        "Оптимизация памяти": [
            ["LargeSystemCache", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v LargeSystemCache /t REG_DWORD /d 1 /f", "warn", "Приоритет файлового кэша над приложениями — ускоряет серверы, замедляет десктоп."],
            ["DisablePagingExecutive", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v DisablePagingExecutive /t REG_DWORD /d 1 /f", "warn", "Ядро Windows в RAM — быстрее отклик, но на <8 ГБ RAM будет нехватка."],
            ["RAM Priority = Games", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v Priority /t REG_DWORD /d 8 /f", "safe", "Максимальный приоритет выделения RAM для игровых процессов."],
            ["ClearPageFileAtShutdown OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v ClearPageFileAtShutdown /t REG_DWORD /d 0 /f", "safe", "Быстрее завершение работы — не очищает pagefile."],
        ],
    },

    "gpu": {
        "Общие настройки": [
            ["Включить HAGS", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v HwSchMode /t REG_DWORD /d 2 /f", "safe", "Hardware-Accelerated GPU Scheduling — GPU сам планирует задачи."],
            ["Включить VRR", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v EnableVariableRefreshRate /t REG_DWORD /d 1 /f", "safe", "Variable Refresh Rate — убирает разрывы на FreeSync/G-Sync мониторах."],
            ["GPU Priority = 8", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", "safe", "Максимальный приоритет GPU для игровых процессов."],
            ["Game Mode ON", "reg add 'HKCU\\Software\\Microsoft\\GameBar' /v AutoGameModeEnabled /t REG_DWORD /d 1 /f; reg add 'HKCU\\Software\\Microsoft\\GameBar' /v AllowAutoGameMode /t REG_DWORD /d 1 /f", "safe", "Game Mode — Windows выделяет ресурсы игре при запуске."],
            ["Отключить FSO глобально", "reg add 'HKCU\\System\\GameConfigStore' /v GameDVR_FSEBehaviorMode /t REG_DWORD /d 2 /f; reg add 'HKCU\\System\\GameConfigStore' /v GameDVR_FSEBehavior /t REG_DWORD /d 2 /f", "safe", "Отключает Fullscreen Optimizations — чистый эксклюзивный fullscreen."],
            ["DWM Optimization", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\DWM' /v OverlayTestMode /t REG_DWORD /d 5 /f", "safe", "Оптимизация Desktop Window Manager — меньше overhead при переключении окон."],
            ["Flip Model Swapchain ON", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v FlipModelSwapchain /t REG_DWORD /d 1 /f", "safe", "Принудительный flip model — быстрее рендеринг в играх."],
            ["DirectX Optimizations", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX\\UserGpuPreferences' /v DirectXUserGlobalSettings /t REG_SZ /d 'SwapEffectUpgradeEnable=1;' /f", "safe", "Включает оптимизации DirectX для swap chain."],
            ["Включить Game Bar Tips", "reg add 'HKCU\\Software\\Microsoft\\GameBar' /v ShowStartupPanel /t REG_DWORD /d 0 /f", "safe", "Убирает всплывающую панель Game Bar при запуске игры."],
            ["Resolution Host OFF", "schtasks /change /tn 'Microsoft\\Windows\\WDI\\ResolutionHost' /disable 2>$null", "safe", "Отключает фоновую задачу разрешения дисплея."],
        ],
        "Game DVR и Xbox": [
            ["Отключить Game DVR полностью", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR' /v AppCaptureEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\System\\GameConfigStore' /v GameDVR_Enabled /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR' /v AllowGameDVR /t REG_DWORD /d 0 /f", "safe", "Полностью отключает Xbox Game DVR — снимает запись экрана и накладки."],
        ],
        "NVIDIA": [
            ["NVIDIA Threaded Optimization ON", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v ThreadedOptimization /t REG_DWORD /d 1 /f", "safe", "Многопоточная оптимизация NVIDIA — распараллеливание на несколько ядер GPU.", "nvidia"],
            ["TDR Delay = 60s", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDelay /t REG_DWORD /d 60 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDdiDelay /t REG_DWORD /d 60 /f", "warn", "60с до сброса GPU призависании — может выглядеть как зависание системы.", "nvidia"],
            ["NVIDIA Low Latency ON", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v LowLatencyMode /t REG_DWORD /d 1 /f", "safe", "Включает NVIDIA Low Latency Mode — меньше input lag.", "nvidia"],
        ],
        "AMD": [
            ["AMD ULPS OFF", "Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*' -Name EnableUlps -ErrorAction SilentlyContinue | ForEach-Object { Set-ItemProperty $_.PSPath -Name EnableUlps -Value 0 }", "safe", "Отключает Ultra Low Power State — GPU не засыпает и не тормозит при пробуждении.", "amd"],
        ],
    },

    "net": {
        "DNS": [
            ["DNS Cloudflare 1.1.1.1", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('1.1.1.1','1.0.0.1') -ErrorAction SilentlyContinue", "safe", "Самый быстрый публичный DNS."],
            ["DNS Google 8.8.8.8", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('8.8.8.8','8.8.4.4') -ErrorAction SilentlyContinue", "safe", "DNS от Google — стабильный и надёжный."],
            ["DNS AdGuard (без рекламы)", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('94.140.14.14','94.140.15.15') -ErrorAction SilentlyContinue", "safe", "DNS с блокировкой рекламы на уровне DNS."],
            ["DNS Quad9 (защита)", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('9.9.9.9','149.112.112.112') -ErrorAction SilentlyContinue", "safe", "DNS с блокировкой вредоносных сайтов."],
            ["DNS over HTTPS Cloudflare", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Dnscache\\Parameters' /v EnableAutoDOH /t REG_DWORD /d 2 /f", "safe", "Шифрует DNS-запросы через HTTPS."],
        ],
        "TCP / Протокол": [
            ["TCP BBR", "netsh int tcp set supplemental Internet congestionprovider=bbr2 2>$null; netsh int tcp set global congestionprovider=bbr 2>$null", "safe", "Современный алгоритм контроля перегрузки — быстрее загрузки."],
            ["TCP Fast Open ON", "netsh int tcp set global fastopen=enabled", "safe", "Ускоряет повторные TCP-соединения."],
            ["TCP Initial RTO 2000ms", "netsh int tcp set global initialRto=2000", "safe", "Быстрее повторная передача при потерях пакетов."],
            ["TCP Auto-Tuning Normal", "netsh int tcp set global autotuninglevel=normal", "safe", "Авто-настройка TCP receive window."],
            ["Nagle OFF (низкий пинг)", "Get-NetAdapter | ForEach-Object { $p = 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\' + $_.InterfaceGuid; if (Test-Path $p) { New-ItemProperty -Path $p -Name TcpAckFrequency -PropertyType DWord -Value 1 -Force | Out-Null; New-ItemProperty -Path $p -Name TCPNoDelay -PropertyType DWord -Value 1 -Force | Out-Null } }", "warn", "Отключает алгоритм Нэгла — ниже пинг, чуть больше пакетов."],
            ["ECN Capability ON", "netsh int tcp set global ecncapability=enabled", "warn", "Explicit Congestion Notification — уведомляет о перегрузке раньше."],
        ],
        "Сетевой адаптер": [
            ["Network Throttling OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f", "safe", "Снимает лимит сетевого трафика — без искусственного троттлинга."],
            ["Wi-Fi Power Saving OFF", "powercfg /setacvalueindex SCHEME_CURRENT 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 0; powercfg /setdcvalueindex SCHEME_CURRENT 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 0; powercfg /setactive SCHEME_CURRENT", "safe", "Wi-Fi адаптер = Maximum Performance — не засыпает."],
            ["QoS Packet Scheduler OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Psched' /v NonBestEffortLimit /t REG_DWORD /d 0 /f", "safe", "Снимает 20% лимит QoS — весь канал доступен."],
            ["MaxUserPort 65534", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v MaxUserPort /t REG_DWORD /d 65534 /f", "safe", "Максимум доступных TCP-портов."],
            ["TcpTimedWaitDelay 30s", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f", "safe", "Быстрее освобождение портов после закрытия соединения."],
        ],
        "Сброс": [
            ["Reset TCP/IP Stack", "netsh int ip reset; netsh winsock reset", "warn", "Полный сброс сетевого стека — теряются VPN, статические IP, кастомные настройки."],
        ],
    },

    "input": {
        "Мышь": [
            ["Отключить Enhance Pointer Precision", "Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name MouseSpeed -Value 0; Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name MouseThreshold1 -Value 0; Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name MouseThreshold2 -Value 0", "safe", "Убирает ускорение курсора — идеально 1:1 для шутеров.", "any"],
            ["MouseDataQueueSize = 10", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\mouclass\\Parameters' /v MouseDataQueueSize /t REG_DWORD /d 10 /f", "warn", "Минимальный буфер событий мыши — быстрее отклик.", "any"],
            ["Отключить Pointer Ballistics (1:1)", "$x = [byte[]]@(0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,192,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0); $y = [byte[]]@(0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,192,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0); Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name SmoothMouseXCurve -Value $x; Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name SmoothMouseYCurve -Value $y", "warn", "Линейная кривая 1:1 — полное убирание баллистикы."],
        ],
        "Клавиатура": [
            ["KeyboardDataQueueSize = 10", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\kbdclass\\Parameters' /v KeyboardDataQueueSize /t REG_DWORD /d 10 /f", "warn", "Минимальный буфер клавиатуры — быстрее отклик при быстром вводе."],
            ["Keyboard Delay/Speed = MAX", "reg add 'HKCU\\Control Panel\\Keyboard' /v KeyboardDelay /t REG_SZ /d 0 /f; reg add 'HKCU\\Control Panel\\Keyboard' /v KeyboardSpeed /t REG_SZ /d 31 /f", "safe", "Нулевая задержка + максимальная скорость повтора клавиш."],
        ],
        "USB": [
            ["USB Selective Suspend OFF", "powercfg /setacvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0; powercfg /setactive scheme_current", "safe", "USB-порты не засыпают — мышь и клавиатура не тормозят."],
        ],
    },

    "disk": {
        "TRIM и оптимизация": [
            ["Включить TRIM", "fsutil behavior set DisableDeleteNotify 0", "safe", "Включает TRIM для SSD — поддерживает производительность записи."],
            ["TRIM сейчас (все диски)", "Get-Volume | Where-Object { $_.DriveType -eq 'Fixed' -and $_.DriveLetter } | ForEach-Object { Optimize-Volume -DriveLetter $_.DriveLetter -ReTrim -ErrorAction SilentlyContinue }", "safe", "Запускает TRIM немедленно на всех SSD."],
            ["Last Access Time OFF", "fsutil behavior set disablelastaccess 1", "safe", "Убирает запись времени доступа — ускоряет операции с файлами."],
            ["8dot3 Names OFF", "fsutil behavior set disable8dot3 1", "safe", "Отключает короткие имена 8.3 — меньше overhead на SSD."],
        ],
        "Кэширование и запись": [
            ["Write-Cache ON (все диски)", "Get-WmiObject -Class Win32_DiskDrive | ForEach-Object { $_.SetPowerState(4, $null) } 2>$null; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\disk\\Enum' /v 0 /t REG_SZ /f 2>$null", "safe", "Включает кэширование записи — ускоряет запись на SSD."],
            ["Write-Cache Buffering ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0001\\Parameters\\Disk' /v WriteCacheEnabled /t REG_SZ /d 1 /f", "safe", "Включает буферизацию записи для SSD."],
        ],
        "Отключение функций": [
            ["Defrag по расписанию OFF", "Disable-ScheduledTask -TaskName 'ScheduledDefrag' -TaskPath '\\Microsoft\\Windows\\Defrag\\' -ErrorAction SilentlyContinue", "safe", "Отключает фоновую дефрагментацию — не нужна для SSD."],
            ["Storage Sense OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\StorageSense\\Parameters\\StoragePolicy' /v 01 /t REG_DWORD /d 0 /f", "safe", "Отключает авт. очистку Storage Sense."],
            ["Search Indexing OFF", "Stop-Service WSearch -ErrorAction SilentlyContinue; Set-Service WSearch -StartupType Disabled", "safe", "Отключает индексацию поиска — меньше чтение диска."],
            ["ReadyBoost OFF", "sc config rdyboost start= disabled 2>$null", "safe", "Отключает ReadyBoost — не нужен для SSD."],
            ["File History OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\FileHistory' /v Disabled /t REG_DWORD /d 1 /f", "safe", "Отключает историю файлов — меньше записи на диск."],
            ["Defrag для SSD OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Defrag\\OptimizeApp' /v Enabled /t REG_DWORD /d 0 /f", "safe", "Отключает автоматическую оптимизацию для SSD — предотвращает лишние записи."],
            ["Windows Search для SSD OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows Search' /v DisableSearchBoxSuggestions /t REG_DWORD /d 1 /f", "safe", "Отключает подсказки поиска — меньше нагрузка на SSD."],
        ],
        "Энергопотребление": [
            ["Диски не засыпают", "powercfg /setacvalueindex scheme_current sub_disk DISKIDLE 0; powercfg /setactive scheme_current", "safe", "Жёсткие диски и SSD не засыпают в простое — мгновенный доступ."],
            ["AHCI Link Power OFF", "powercfg /setacvalueindex scheme_current sub_DISKSTORABLE 0; powercfg /setactive scheme_current", "safe", "Отключает节能-режим AHCI — убирает задержки пробуждения SSD."],
            ["Hibernate Size = 50%", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power' /v HibernateFileSizePercent /t REG_DWORD /d 50 /f", "safe", "Уменьшает файл гибернации до 50% от RAM — экономит место на SSD."],
        ],
        "Производительность": [
            ["NTFS Memory Usage = High", "fsutil behavior set memoryusage 2", "safe", "Больше оперативной памяти под NTFS-кэш — ускоряет чтение."],
            ["Long Paths > 260 ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' /v LongPathsEnabled /t REG_DWORD /d 1 /f", "safe", "Поддержка длинных путей > 260 символов."],
            ["Pagefile = SSD-оптимизация", "wmic pagefileset where name='C:\\pagefile.sys' set InitialSize=4096,MaximumSize=8192", "warn", "Фиксирует pagefile 4-8 ГБ — предотвращает фрагментацию на SSD."],
            ["NTFS Last Access Timestamp OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' /v NtfsDisableLastAccessUpdate /t REG_DWORD /d 1 /f", "safe", "Отключает обновление метки времени последнего доступа — меньше записей на SSD."],
        ],
    },

    "priv": {
        "Телеметрия Microsoft": [
            ["Отключить телеметрию", "Stop-Service DiagTrack -ErrorAction SilentlyContinue; Set-Service DiagTrack -StartupType Disabled; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection' /v AllowTelemetry /t REG_DWORD /d 0 /f", "safe", "Полностью отключает сбор данных Microsoft."],
            ["Cortana OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search' /v AllowCortana /t REG_DWORD /d 0 /f", "safe", "Отключает Cortana."],
            ["Activity History OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v EnableActivityFeed /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v PublishUserActivities /t REG_DWORD /d 0 /f", "safe", "Отключает историю активности."],
            ["Connected User Experiences OFF", "Stop-Service dmwappushservice -ErrorAction SilentlyContinue; Set-Service dmwappushservice -StartupType Disabled", "safe", "Отключает канал телеметрии dmwappushservice."],
            ["Customer Experience tasks OFF", "schtasks /change /tn 'Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator' /disable 2>$null; schtasks /change /tn 'Microsoft\\Windows\\Customer Experience Improvement Program\\UsbCeip' /disable 2>$null; schtasks /change /tn 'Microsoft\\Windows\\Customer Experience Improvement Program\\KernelCeipTask' /disable 2>$null", "safe", "Отключает задачи CEIP — сбор данных об использовании."],
            ["CompatTelRunner OFF", "schtasks /change /tn 'Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser' /disable 2>$null; schtasks /change /tn 'Microsoft\\Windows\\Application Experience\\ProgramDataUpdater' /disable 2>$null", "safe", "Отключает проверку совместимости при обновлении."],
            ["Biometric Service OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Biometrics' /v Enabled /t REG_DWORD /d 0 /f; Stop-Service WbioSrvc -ErrorAction SilentlyContinue; Set-Service WbioSrvc -StartupType Disabled", "safe", "Отключает биометрические сервисы."],
            ["Office Telemetry OFF", "reg add 'HKCU\\SOFTWARE\\Policies\\Microsoft\\Office\\16.0\\Common\\ClientTelemetry' /v DisableTelemetry /t REG_DWORD /d 1 /f", "safe", "Отключает телеметрию Microsoft Office."],
        ],
        "Реклама и контент": [
            ["Advertising ID OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo' /v Enabled /t REG_DWORD /d 0 /f", "safe", "Отключает рекламный идентификатор."],
            ["Suggested Apps OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SystemPaneSuggestionsEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-338388Enabled /t REG_DWORD /d 0 /f", "safe", "Убирает рекомендации в меню Пуск."],
            ["Cloud Content OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v PreInstalledAppsEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SilentInstalledAppsEnabled /t REG_DWORD /d 0 /f", "safe", "Отключает облачный контент и авт. установку приложений."],
            ["Tips/Tricks OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SoftLandingEnabled /t REG_DWORD /d 0 /f", "safe", "Убирает подсказки Windows."],
            ["Реклама в Settings OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-338393Enabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-353694Enabled /t REG_DWORD /d 0 /f", "safe", "Убирает рекламу в параметрах Windows."],
            ["Реклама на Lock Screen OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Lock Screen' /v RotatingLockScreenOverlayEnabled /t REG_DWORD /d 0 /f", "safe", "Убирает рекламу на экране блокировки."],
            ["Bing в Search OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search' /v BingSearchEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search' /v CortanaConsent /t REG_DWORD /d 0 /f", "safe", "Убирает результаты Bing из локального поиска."],
            ["Location Tracking OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location' /v Value /t REG_SZ /d Deny /f", "safe", "Отключает геолокацию."],
            ["Feedback OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules' /v NumberOfSIUFInPeriod /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection' /v DoNotShowFeedbackNotifications /t REG_DWORD /d 1 /f", "safe", "Убирает запросы обратной связи от Microsoft."],
        ],
        "Службы и компоненты": [
            ["Edge Background OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v StartupBoostEnabled /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v BackgroundModeEnabled /t REG_DWORD /d 0 /f", "safe", "Edge не запускается в фоне."],
            ["Speech Recognition OFF", "reg add 'HKCU\\Software\\Microsoft\\Speech_OneCore\\Settings\\OnlineSpeechPrivacy' /v HasAccepted /t REG_DWORD /d 0 /f", "safe", "Отключает распознавание речи."],
            ["Inking Learning OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\InputPersonalization' /v RestrictImplicitInkCollection /t REG_DWORD /d 1 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\InputPersonalization' /v RestrictImplicitTextCollection /t REG_DWORD /d 1 /f", "safe", "Отключает сбор данных для обучения ввода."],
            ["Sync Settings OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\SettingSync' /v DisableSettingSync /t REG_DWORD /d 2 /f", "safe", "Без синхронизации настроек через Microsoft Account."],
        ],
    },

    "kernel": {
        "Память и таймер": [
            ["Large Pages ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v LargePageMinimum /t REG_DWORD /d 0 /f", "safe", "Включает большие страницы памяти — быстрее работа БД и игр."],
            ["GlobalTimerResolutionRequests ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v GlobalTimerResolutionRequests /t REG_DWORD /d 1 /f", "safe", "Глобальный запрос высокого timer resolution — стабильнее 0.5мс."],
            ["DistributeTimers ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v DistributeTimers /t REG_DWORD /d 1 /f", "safe", "Распределение таймеров по ядрам — снижает contention."],
        ],
        "Система": [
            ["Driver Verifier OFF", "verifier /reset", "safe", "Отключает Driver Verifier — убирает проверку драйверов."],
            ["Boot Timeout 0", "bcdedit /timeout 0", "safe", "Без задержки boot menu — мгновенная загрузка."],
            ["Legacy Boot Menu", "bcdedit /set bootmenupolicy Legacy", "safe", "Классическое boot menu — быстрее доступ к F8."],
        ],
    },

    "cust": {
        "Проводник": [
            ["Классическое меню Win11", "reg add 'HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32' /f /ve", "safe", "Возвращает классическое контекстное меню (без 'Ещё')."],
            ["Показать расширения файлов", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v HideFileExt /t REG_DWORD /d 0 /f", "safe", "Показывает .txt, .exe и другие расширения."],
            ["Показать скрытые файлы", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v Hidden /t REG_DWORD /d 1 /f", "safe", "Скрытые файлы и папки видны."],
        ],
        "Анимации и внешний вид": [
            ["Задержка меню = 0", "reg add 'HKCU\\Control Panel\\Desktop' /v MenuShowDelay /t REG_SZ /d 0 /f", "safe", "Мгновенное открытие контекстных меню."],
            ["Анимации окон OFF", "reg add 'HKCU\\Control Panel\\Desktop\\WindowMetrics' /v MinAnimate /t REG_SZ /d 0 /f", "safe", "Без анимаций сворачивания/разворачивания окон."],
            ["Visual Effects = Performance", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects' /v VisualFXSetting /t REG_DWORD /d 2 /f", "safe", "Отключает все визуальные эффекты — максимум производительности."],
            ["Transparency OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v EnableTransparency /t REG_DWORD /d 0 /f", "safe", "Отключает прозрачность Windows — меньше нагрузка на GPU."],
            ["Принудительный Dark Mode", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v AppsUseLightTheme /t REG_DWORD /d 0 /f; reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v SystemUsesLightTheme /t REG_DWORD /d 0 /f", "safe", "Тёмная тема для приложений и системы."],
        ],
        "Панель задач": [
            ["Widgets OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarDa /t REG_DWORD /d 0 /f", "safe", "Убирает виджеты с панели задач."],
            ["Chat в Taskbar OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarMn /t REG_DWORD /d 0 /f", "safe", "Убирает Teams Chat с панели задач."],
            ["Snap Assist OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v SnapAssist /t REG_DWORD /d 0 /f", "safe", "Отключает помощник привязки окон."],
            ["News and Interests OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Feeds' /v EnableFeeds /t REG_DWORD /d 0 /f", "safe", "Убирает виджет новостей."],
            ["Search Box → иконка", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search' /v SearchboxTaskbarMode /t REG_DWORD /d 0 /f", "safe", "Компактная иконка поиска вместо широкого поля."],
            ["Lock Screen Spotlight OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v RotatingLockScreenEnabled /t REG_DWORD /d 0 /f", "safe", "Убирает авто-смену обоев на экране блокировки."],
            ["Маленькие иконки taskbar", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarSmallIcons /t REG_DWORD /d 1 /f", "safe", "Компактная панель задач."],
            ["Taskbar Left Align (Win11)", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarAl /t REG_DWORD /d 0 /f", "safe", "Иконки панели задач слева как в Windows 10."],
        ],
        "Прочее": [
            ["Startup Sound OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Authentication\\LogonUI\\BootAnimation' /v DisableStartupSound /t REG_DWORD /d 1 /f", "safe", "Без звука при загрузке Windows."],
            ["Классический Volume Mixer", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\MTCUVC' /v EnableMtcUvc /t REG_DWORD /d 0 /f", "safe", "Возвращает классический микшер громкости."],
            ["Sticky Keys hotkey OFF", "reg add 'HKCU\\Control Panel\\Accessibility\\StickyKeys' /v Flags /t REG_SZ /d 506 /f", "safe", "Отключает активацию по 5x Shift."],
            ["NumLock ON при старте", "reg add 'HKU\\.DEFAULT\\Control Panel\\Keyboard' /v InitialKeyboardIndicators /t REG_SZ /d 2 /f", "safe", "NumLock включается автоматически."],
        ],
    },

    "sec": {
        "Защита Windows": [
            ["Cloud Protection OFF", "Set-MpPreference -MAPSReporting Disabled -ErrorAction SilentlyContinue; Set-MpPreference -SubmitSamplesConsent NeverSend -ErrorAction SilentlyContinue", "danger", "Отключает отправку в облако Microsoft. Снижает защиту от новых угроз."],
            ["SmartScreen Edge OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v SmartScreenEnabled /t REG_DWORD /d 0 /f", "danger", "Отключает SmartScreen — меньше проверок, быстрее загрузки. ОПАСНО."],
        ],
    },

    "danger": {
        "Безопасность и защита": [
            ["Spectre/Meltdown митигации OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverride /t REG_DWORD /d 3 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverrideMask /t REG_DWORD /d 3 /f", "danger", "+3-10% FPS. Открывает аппаратные уязвимости — удалённый код на CPU."],
            ["VBS / HVCI OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard' /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity' /v Enabled /t REG_DWORD /d 0 /f", "danger", "+5-15% FPS. Отключает ядерную защиту Windows — эксплойты работают без ограничений."],
        ],
        "Гипервизор и виртуализация": [
            ["Hyper-V OFF", "bcdedit /set hypervisorlaunchtype off", "warn", "Отключает гипервизор. Ломает WSL2, Docker, Android-эмуляторы. Требует ребут."],
        ],
    },

    "nuke_security": {
        "Windows Defender": [
            ["Полный стоп Defender", "Stop-Service WinDefend -ErrorAction SilentlyContinue; Set-Service WinDefend -StartupType Disabled -ErrorAction SilentlyContinue", "danger", "Полностью останавливает и отключает службу Windows Defender."],
            ["Defender realtime OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f", "danger", "Отключает мониторинг в реальном времени — никакой проверки файлов."],
            ["Behavior Monitor OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableBehaviorMonitoring /t REG_DWORD /d 1 /f", "danger", "Отключает мониторинг поведения — вирусы-хитрости не ловятся."],
            ["IOAV Protection OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableIOAVProtection /t REG_DWORD /d 1 /f", "danger", "Отключает проверку скачиваемых файлов."],
            ["Script Scanning OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableScriptScanning /t REG_DWORD /d 1 /f", "danger", "Отключает сканирование скриптов (PowerShell, VBS, JS)."],
            ["Defender Cloud OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet' /v SubmitSamplesConsent /t REG_DWORD /d 2 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet' /v SpynetNetTestingDisabled /t REG_DWORD /d 1 /f", "danger", "Отключает облачную проверку и отправку образцов."],
            ["Defender Exclusion: C:\\", "Add-MpPreference -ExclusionPath 'C:\\' -ErrorAction SilentlyContinue", "danger", "Весь диск C:\\ исключён из проверки. Вирусы свободно работают."],
            ["Tamper Protection OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows Defender\\Features' /v TamperProtection /t REG_DWORD /d 0 /f", "danger", "Отключает защиту от изменений — можно менять любые настройки Defender."],
            ["Defender Scheduled Scan OFF", "schtasks /change /tn '\\Microsoft\\Windows\\Windows Defender\\Scheduled Scan' /disable 2>$null", "danger", "Отключает запланированные сканирования."],
            ["Windows Security Center OFF", "Stop-Service wscsvc -ErrorAction SilentlyContinue; Set-Service wscsvc -StartupType Disabled -ErrorAction SilentlyContinue", "danger", "Отключает центр безопасности — никаких уведомлений о проблемах."],
        ],
        "Брандмауэр (Firewall)": [
            ["Firewall OFF (все профили)", "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False -ErrorAction SilentlyContinue", "danger", "Полностью отключает брандмауэр на всех профилях. Система открыта."],
            ["Firewall Domain OFF", "Set-NetFirewallProfile -Profile Domain -Enabled False -ErrorAction SilentlyContinue", "danger", "Отключает брандмауэр для доменной сети."],
            ["Firewall Private OFF", "Set-NetFirewallProfile -Profile Private -Enabled False -ErrorAction SilentlyContinue", "danger", "Отключает брандмауэр для частной сети."],
            ["Firewall Public OFF", "Set-NetFirewallProfile -Profile Public -Enabled False -ErrorAction SilentlyContinue", "danger", "Отключает брандмауэр для публичной сети."],
            ["Firewall Service OFF", "Stop-Service mpssvc -ErrorAction SilentlyContinue; Set-Service mpssvc -StartupType Disabled -ErrorAction SilentlyContinue", "danger", "Полностью останавливает службу брандмауэра."],
        ],
        "SmartScreen и защита приложений": [
            ["SmartScreen OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer' /v SmartScreenEnabled /t REG_SZ /d 'Off' /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v EnableSmartScreen /t REG_DWORD /d 0 /f", "danger", "Отключает SmartScreen — никакой проверки скачиваемых файлов."],
            ["SmartScreen Store OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AppHost' /v EnableWebContentEvaluation /t REG_DWORD /d 0 /f", "danger", "Отключает проверку SmartScreen в Store и UWP-приложениях."],
            ["Уведомления SmartScreen OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer' /v SmartScreenEnabled /t REG_SZ /d 'Off' /f", "danger", "Убирает предупреждения SmartScreen при запуске приложений."],
            ["Exploit Protection OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\' /v DisableExceptionChainValidation /t REG_DWORD /d 1 /f", "danger", "Отключает эксплойт-защиту — вредоносные коды работают без ограничений."],
        ],
        "Защита обновлений": [
            ["Windows Update OFF", "Stop-Service wuauserv -ErrorAction SilentlyContinue; Set-Service wuauserv -StartupType Disabled -ErrorAction SilentlyContinue; Stop-Service bits -ErrorAction SilentlyContinue; Set-Service bits -StartupType Disabled -ErrorAction SilentlyContinue", "danger", "Полностью отключает Windows Update. Никаких патчей безопасности."],
            ["Delivery Optimization OFF", "Stop-Service DoSvc -ErrorAction SilentlyContinue; Set-Service DoSvc -StartupType Disabled -ErrorAction SilentlyContinue", "danger", "Отключает раздачу обновлений другим компьютерам."],
            ["Update Medic OFF", "Stop-Service WaaSMedicSvc -ErrorAction SilentlyContinue; Set-Service WaaSMedicSvc -StartupType Disabled -ErrorAction SilentlyContinue", "danger", "Отключает автоматическое восстановление обновлений."],
        ],
        "UAC и политики": [
            ["UAC OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v EnableLUA /t REG_DWORD /d 0 /f", "danger", "Полностью отключает UAC. Все приложения запускаются с правами админа без вопросов."],
            ["Admin Approval Mode OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v FilterAdministratorToken /t REG_DWORD /d 0 /f", "danger", "Отключает раздельные токены для встроенного админа."],
            ["WDAC OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v WDACOverride /t REG_DWORD /d 0 /f 2>$null", "danger", "Отключает Windows Defender Application Control."],
        ],
        "Гипервизор и ядро": [
            ["Credential Guard OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa' /v RunAsPPL /t REG_DWORD /d 0 /f", "danger", "Отключает защиту учётных данных — LSASS доступен для кражи."],
            ["Spectre/Meltdown OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverride /t REG_DWORD /d 3 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverrideMask /t REG_DWORD /d 3 /f", "danger", "Отключает аппаратные митигации CPU."],
            ["DEP OFF", "bcdedit /set nx AlwaysOff 2>$null", "danger", "Отключает защиту выполнения данных — буферные переполнения работают."],
        ],
    },

    "tools": {
        "Проверка системы": [
            ["SFC Scannow", "Start-Process cmd -ArgumentList '/k sfc /scannow'", "safe", "Проверка и восстановление системных файлов."],
            ["DISM RestoreHealth", "Start-Process cmd -ArgumentList '/k dism /online /cleanup-image /restorehealth'", "safe", "Восстановление образа Windows из центра обновления."],
            ["CHKDSK C: /f /r", "Start-Process cmd -ArgumentList '/k chkdsk C: /f /r'", "warn", "Проверка диска на ошибки. Требует перезагрузки."],
            ["DISM Cleanup", "Start-Process cmd -ArgumentList '/k dism /online /cleanup-image /startcomponentcleanup'", "safe", "Очистка неиспользуемых компонентов Windows."],
            ["gpupdate /force", "Start-Process cmd -ArgumentList '/k gpupdate /force'", "safe", "Принудительное применение групповых политик."],
        ],
        "Сброс и перезапуск": [
            ["Сброс Winsock", "Start-Process cmd -ArgumentList '/k netsh winsock reset'", "safe", "Сброс сетевых сокетов."],
            ["Сброс TCP/IP", "Start-Process cmd -ArgumentList '/k netsh int ip reset'", "safe", "Сброс сетевого стека."],
            ["Сброс Windows Update", "Stop-Service wuauserv,bits,cryptsvc,msiserver -Force -ErrorAction SilentlyContinue; Remove-Item 'C:\\Windows\\SoftwareDistribution' -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item 'C:\\Windows\\System32\\catroot2' -Recurse -Force -ErrorAction SilentlyContinue; Start-Service wuauserv,bits,cryptsvc,msiserver", "safe", "Полный сброс Windows Update."],
            ["Сброс Microsoft Store", "wsreset.exe", "safe", "Сброс кэша Microsoft Store."],
            ["Перезапуск Explorer", "Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue; Start-Process explorer", "safe", "Быстрый перезапуск проводника."],
            ["Перезапуск Audio Service", "Restart-Service Audiosrv -Force; Restart-Service AudioEndpointBuilder -Force", "safe", "Решает проблемы со звуком."],
            ["Перезапуск Print Spooler", "Restart-Service Spooler -Force", "safe", "Решает зависший принтер."],
            ["Очистить Event Log", "wevtutil el | ForEach-Object { wevtutil cl $_ 2>$null }", "safe", "Очищает все журналы событий."],
        ],
        "Энергопотребление": [
            ["powercfg /energy", "Start-Process cmd -ArgumentList '/k powercfg /energy /output %temp%\\energy.html /duration 30'", "safe", "Анализ энергопотребления — отчёт на Desktop."],
            ["Battery Report", "Start-Process cmd -ArgumentList '/k powercfg /batteryreport /output %userprofile%\\Desktop\\battery.html'", "safe", "Отчёт о состоянии батареи."],
        ],
    },
}
