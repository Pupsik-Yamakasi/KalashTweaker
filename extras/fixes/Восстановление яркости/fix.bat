@echo off
chcp 65001 >nul
powercfg /setacvalueindex SCHEME_CURRENT SUB_VIDEO VIDEOBrightness 50
powercfg /setactive SCHEME_CURRENT
echo Done.