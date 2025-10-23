# Changelog

## Version 3.0.0 (Latest) - Tauri Edition

### 🚀 Complete Rewrite
- **Total Rewrite**: Migrated from Python + Tkinter to Tauri + React + Rust
- **Native Performance**: Built with Rust backend for maximum speed and efficiency
- **Modern UI**: React 18 with TypeScript for a professional interface
- **Native Executable**: Single ~15MB executable with no external dependencies
- **Instant Startup**: <1 second startup time vs 3-5s in Python version

### ✨ New Features
- **500+ Professional Palettes**: Loaded from nice-color-palettes (GitHub)
- **Async Palette Loading**: Non-blocking palette fetching with tokio
- **Modern Dark UI**: Sleek React interface with smooth animations
- **Real-time Updates**: Instant visual feedback for all actions
- **Cross-platform Ready**: Built on Tauri 2.0 (Windows focus for now)
- **NSIS Installer**: Professional Windows installer included
- **Portable Mode**: Run directly without installation

### 🔧 Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Rust with Tauri 2.0
- **Windows API**: windows-rs crate for precise control
- **Networking**: reqwest for HTTP requests
- **Async Runtime**: tokio for concurrent operations
- **Build System**: Vite for fast development

### 📦 Distribution
- **Installer**: `BoomBang Color Palette_3.0.0_x64-setup.exe`
- **Portable**: `boombang-palette.exe` (~15MB)
- **No Dependencies**: WebView2 installed automatically
- **Clean Uninstall**: Full Windows integration

### 🎯 Improvements over v2.0
- **5x Faster Startup**: Native code vs Python interpreter
- **3x Smaller Size**: ~15MB vs ~50MB + Python installation
- **5x More Palettes**: 500+ vs 100 palettes
- **Better UI**: Modern React vs Tkinter
- **No Dependencies**: Self-contained vs requiring Python
- **Professional Build**: Proper versioning and metadata

### 🐛 Bug Fixes
- Improved color wheel detection accuracy
- Better window focus handling
- More reliable calibration system
- Fixed color application timing issues

---

## Version 2.0.0 - Python Edition

### Major Improvements
- **100+ High-Quality Palettes**: Curated palettes from professional color theory
- **Coolors.co Integration**: Trending palettes with fallback
- **Advanced Algorithms**: 12 new palette generation schemes
- **Infinite Variations**: Intelligent randomization
- **Smart Caching**: 7-day cache system

### New Palette Schemes
- Coolors Trending (from cache)
- Advanced Split Complementary
- Advanced Tetradic
- Advanced Compound
- Advanced Shades & Tints
- Vibrant Random
- Pastel Dream
- Monochromatic
- Nature Inspired
- And more...

### Technical Improvements
- Professional color theory algorithms
- Better HSV color matching
- Improved color wheel detection
- Optimized palette generation

### Bug Fixes
- Fixed window detection (excludes own window)
- Improved click detection on game window
- Better brightness slider control

---

## Version 1.0.0 - Initial Release

### Initial Release
- Basic palette generation
- 7 color schemes
- Game integration with Windows API
- Modern Tkinter UI
- Calibration system
- Python + pywin32 implementation
