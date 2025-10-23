@echo off
echo ========================================
echo BoomBang Palette - Tauri Dev with VS
echo ========================================
echo.

REM Setup Visual Studio environment first
echo Configuring Visual Studio C++ environment...
if exist "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvarsall.bat" (
    call "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvarsall.bat" x64
    echo Visual Studio environment configured successfully!
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvarsall.bat" (
    call "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvarsall.bat" x64
    echo Visual Studio environment configured successfully!
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvarsall.bat" (
    call "C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvarsall.bat" x64
    echo Visual Studio environment configured successfully!
) else (
    echo ERROR: Could not find Visual Studio Build Tools!
    echo Please install "Desktop development with C++" from:
    echo https://visualstudio.microsoft.com/downloads/
    pause
    exit /b 1
)

echo.
REM Add Rust to PATH
set PATH=%USERPROFILE%\.cargo\bin;%PATH%

echo Checking Rust installation...
cargo --version
if errorlevel 1 (
    echo ERROR: Rust not found!
    pause
    exit /b 1
)

echo.
echo Checking linker...
where link.exe
if errorlevel 1 (
    echo ERROR: linker not found even after VS setup!
    pause
    exit /b 1
)

echo.
echo ========================================
echo All prerequisites OK! Starting Tauri...
echo ========================================
echo NOTE: First compilation takes 5-15 minutes
echo.

npm run tauri dev

pause
