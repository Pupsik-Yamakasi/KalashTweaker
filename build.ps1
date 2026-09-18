# KALASH TWEAKER — one-file build with automated sanity check.
# Ensures the produced .exe is a TRUE single-file build that works on any PC
# WITHOUT installing Python (python311.dll must be embedded), then signs it.
#
#   powershell -ExecutionPolicy Bypass -File build.ps1
#   (BUILD_VER.txt is embedded into the exe so the update banner
#    compares against the real release and disappears after updating)

param(
    [string]$Version = ""
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

# The runtime version is the single source of truth for a build. Accepting a
# different command-line version used to make BUILD_VER.txt disagree with the
# executable metadata and update checks.
$versionMatch = Select-String -LiteralPath (Join-Path $PSScriptRoot 'main.py') `
    -Pattern '^VERSION\s*=\s*"([^"]+)"' | Select-Object -First 1
if (-not $versionMatch) { throw 'Could not read VERSION from main.py.' }
$sourceVersion = $versionMatch.Matches[0].Groups[1].Value
if ([string]::IsNullOrWhiteSpace($Version)) {
    $Version = $sourceVersion
} elseif ($Version -ne $sourceVersion) {
    throw "Build version $Version differs from main.py VERSION $sourceVersion. Update the project version markers first."
}

# ── Шаг 1: Защита — шифрование веб-файлов ──
# NOTE: encryption disabled — ship web files in plain (no password prompt at startup).
# If you want anti-decompilation + password dialog again, restore this block.
# Write-Host "==> Encrypting web files (anti-decompilation) ..."
# $protScript = Join-Path $PSScriptRoot 'protection.py'
# $webDir = Join-Path $PSScriptRoot 'web'
# & python $protScript encrypt $webDir
# if ($LASTEXITCODE -ne 0) { Write-Warning "Encryption step failed, continuing with plain files" }
# else { Write-Host "    Web files encrypted (.enc)" }

# Embed the release version — the app compares GitHub latest tag to it.
"$Version" | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'web\BUILD_VER.txt') -Encoding Ascii -NoNewline
Write-Host "==> Embedded BUILD_VER.txt = $Version"

$ExePath = Join-Path $PSScriptRoot 'dist\KALASH_TWEAKER_v2.exe'

Write-Host "==> Building one-file EXE (python311.dll embedded) ..."
& python -m PyInstaller build.spec --noconfirm --clean
if ($LASTEXITCODE -ne 0) { throw "PyInstaller failed with exit code $LASTEXITCODE" }

Write-Host "==> Verifying no missing-Python-DLL scenario ..."
if (-not (Test-Path -LiteralPath $ExePath)) { throw "EXE not produced: $ExePath" }

# python311.dll MUST be physically inside the single exe.
$bytes = [System.IO.File]::ReadAllBytes($ExePath)
$text  = [System.Text.Encoding]::ASCII.GetString($bytes)
$pythonDll = [regex]::Match($text, 'python3\d{2}\.dll', 'IgnoreCase').Value
if (-not $pythonDll) {
    throw 'python3xx.dll is NOT inside the exe. Build is NOT portable - aborting.'
}
$meipass = $text -match '_MEIPASS'
if (-not $meipass) {
    throw 'Single-file _MEIPASS marker missing. Build is NOT one-file - aborting.'
}
Write-Host "    ${pythonDll}: EMBEDDED (OK)"
Write-Host "    single-file :   OK"

# A single .exe must be the only distribution artifact in dist/.
$extras = Get-ChildItem -LiteralPath (Split-Path $ExePath) |
    Where-Object { $_.Name -ne (Split-Path $ExePath -Leaf) }
if ($extras) {
    Write-Warning "Extra files in dist/: $($extras.Name -join ', ')"
}

Write-Host "==> Signing build ..."
& powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'sign_build.ps1')
if ($LASTEXITCODE -ne 0) { throw 'Signing failed' }

$hash = (Get-FileHash -LiteralPath $ExePath -Algorithm SHA256).Hash
$size = [math]::Round((Get-Item -LiteralPath $ExePath).Length / 1MB, 1)
Write-Host ""
Write-Host "==> DONE: portable single-file artifact"
Write-Host "    $ExePath"
Write-Host "    Size : $size MB"
Write-Host "    SHA256: $hash"
