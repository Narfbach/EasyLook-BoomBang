# Create cache directory
$cacheDir = Join-Path $env:LOCALAPPDATA "boombang-palette"
New-Item -ItemType Directory -Force -Path $cacheDir | Out-Null

# Copy cache file
$sourceFile = Join-Path $PSScriptRoot "..\dist\palettes_cache.json"
$destFile = Join-Path $cacheDir "palettes_cache.json"

Copy-Item $sourceFile $destFile -Force

Write-Host "Cache file copied successfully to: $destFile" -ForegroundColor Green

