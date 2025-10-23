@echo off
echo Building BoomBang Palette App...
call npm run tauri build
echo.
echo Build complete!
echo Executable location: src-tauri\target\release\boombang-palette.exe
pause
