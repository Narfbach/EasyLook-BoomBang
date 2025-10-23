@echo off
echo ========================================
echo BoomBang Palette Generator - Tauri Dev
echo ========================================
echo.

REM Add Rust to PATH
set PATH=%USERPROFILE%\.cargo\bin;%PATH%

echo Checking Rust installation...
cargo --version
if errorlevel 1 (
    echo.
    echo ERROR: Rust not found!
    echo Please close this terminal and open a NEW one after Rust installation.
    pause
    exit /b 1
)

echo.
echo Setting up Visual Studio environment...
REM Try to find and run vcvarsall.bat
if exist "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvarsall.bat" (
    call "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvarsall.bat" x64
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvarsall.bat" (
    call "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvarsall.bat" x64
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvarsall.bat" (
    call "C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvarsall.bat" x64
) else (
    echo WARNING: Could not find Visual Studio environment setup.
    echo The build might fail without C++ build tools.
)

echo.
echo Starting Tauri development server...
echo This will take several minutes the first time (compiling Rust dependencies)
echo.

npm run tauri dev

pause
