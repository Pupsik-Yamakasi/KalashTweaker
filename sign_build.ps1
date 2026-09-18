# KALASH TWEAKER — script to create a self-signed code-signing certificate
# and sign the built executable. Run from the KALASH_BUILD folder:
#   powershell -ExecutionPolicy Bypass -File sign_build.ps1
#
# NOTE: A self-signed signature silences Windows' "unknown publisher"
# warning only on machines where this certificate is trusted (see CERT file).
# For global trust (including VirusTotal reputation) you need a public
# code-signing certificate from a real CA (DigiCert, Sectigo, GlobalSign...).

$ErrorActionPreference = 'Stop'

$CertName    = 'KALASH TWEAKER Code Signing (self-signed)'
$CertStore   = 'Cert:\CurrentUser\My'
$CertOut     = Join-Path $PSScriptRoot 'KALASH_code_signing.cer'
$ExePath     = Join-Path $PSScriptRoot 'dist\KALASH_TWEAKER_v2.exe'

if (-not (Test-Path -LiteralPath $ExePath)) {
    Write-Error "Build not found: $ExePath`nRun: pyinstaller build.spec --noconfirm --clean first."
}

# 1. Reuse an existing KALASH TWEAKER signing certificate (CurrentUser store).
$cert = Get-ChildItem -Path $CertStore -CodeSigningCert |
    Where-Object { $_.FriendlyName -eq $CertName } |
    Sort-Object NotAfter -Descending |
    Select-Object -First 1

if (-not $cert) {
    Write-Host "Creating self-signed code-signing certificate..."
    $cert = New-SelfSignedCertificate `
        -Type CodeSigningCert `
        -Subject "CN=KALASH TWEAKER, O=KALASH" `
        -FriendlyName $CertName `
        -CertStoreLocation $CertStore `
        -KeyUsage DigitalSignature `
        -KeyExportPolicy Exportable
}

Write-Host "Certificate thumbprint: $($cert.Thumbprint)"
Write-Host "Certificate subject:    $($cert.Subject)"

# 2. Export the certificate so computers can trust this publisher.
try {
    Export-Certificate -Cert $cert -FilePath $CertOut -Type CERT | Out-Null
    Write-Host "Certificate exported:   $CertOut"
} catch {
    Write-Warning "Could not export certificate: $_"
}

# 3. Sign the executable (RFC3161 timestamp when signtool is available).
Write-Host "Signing: $ExePath"
$signtool = Get-Command signtool.exe -ErrorAction SilentlyContinue
if ($signtool) {
    $certPath = Join-Path $env:TEMP 'kalash_signing.cer'
    Export-Certificate -Cert $cert -FilePath $certPath -Type CERT | Out-Null
    & $signtool.Source sign /fd SHA256 /f $certPath `
        /tr http://timestamp.digicert.com /td SHA256 `
        $ExePath
    if ($LASTEXITCODE -ne 0) { throw "signtool failed with exit code $LASTEXITCODE" }
} else {
    Write-Host "    (signtool not found, falling back to Set-AuthenticodeSignature; no timestamp)"
    Set-AuthenticodeSignature -FilePath $ExePath -Certificate $cert | Out-Null
}

# 4. Verify.
$sig = Get-AuthenticodeSignature -FilePath $ExePath
Write-Host ""
Write-Host "Signature status:  $($sig.Status)"
Write-Host "Signer:            $($sig.SignerCertificate.Subject)"
Write-Host "TimeStamped:       $($sig.TimeStamperCertificate -ne $null)"

$props = (Get-Item -LiteralPath $ExePath).VersionInfo
Write-Host ""
Write-Host "File version:      $($props.FileVersion)"
Write-Host "File description:  $($props.FileDescription)"
Write-Host "Product:           $($props.ProductName)"