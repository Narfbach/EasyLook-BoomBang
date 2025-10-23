# BoomBang Color Palette Generator - Features

## Version 3.0.0 - Tauri Native Edition

### 🎨 Palette Generation

#### **500+ Professional Palettes**
- Loaded from nice-color-palettes (GitHub repository)
- Curated by color theory professionals
- Proven combinations used in real designs
- Async loading for instant app startup
- Cached automatically for offline use

#### **Smart Random Selection**
- Each click gives you a new random palette from 500+
- Virtually infinite combinations
- No complex schemes needed - just beautiful palettes
- Instant generation with no lag

### 🎯 Key Features

#### **Native Performance**
- Built with Rust for maximum speed
- <1 second startup time
- Instant palette switching
- Low memory footprint (~50MB RAM)
- No Python interpreter overhead

#### **Modern Technology Stack**
- **Backend**: Rust with Tauri 2.0
- **Frontend**: React 18 + TypeScript
- **Windows API**: Direct Win32 integration via windows-rs
- **Async**: tokio runtime for non-blocking operations
- **HTTP**: reqwest for palette fetching
- **Build**: Vite for lightning-fast development

#### **Precise Color Application**
- Direct Windows API control (EnumWindows, SetCursorPos, SendInput)
- Pixel-perfect color wheel positioning
- HSV to screen coordinate conversion
- Smooth mouse movement and clicks
- Reliable brightness slider control

### 🖥️ User Interface

#### **Modern React Design**
- Sleek dark theme with gradient accents
- Responsive and fluid animations
- Professional color cards with hover effects
- Real-time status updates
- Smooth transitions and visual feedback

#### **Interactive Elements**
- Click any color to apply instantly to game
- Apply colors in any order you prefer
- Green checkmarks show applied colors
- Progress indicator (X/5 colors applied)
- One-click palette regeneration
- Calibrate/Recalibrate buttons always accessible

### 🎮 Game Integration

#### **Direct Window Control**
- Native Win32 API via Rust (windows-rs crate)
- Finds BoomBang window automatically
- Works in windowed mode (recommended)
- Precise mouse control (SetCursorPos)
- Simulated clicks and drags (SendInput)
- No screen recording or macros

#### **Advanced Calibration**
- 4-step guided calibration process
- ENTER key to capture each point
- Stores: wheel center, wheel radius, brightness slider
- Saved in Tauri's app data directory
- Recalibrate anytime with one click
- Persistent across app restarts

### 🔧 Technical Features

#### **Performance**
- Native Rust backend (zero-cost abstractions)
- React virtual DOM for efficient UI updates
- Async/await for non-blocking operations
- WebView2 for native rendering
- <50MB memory usage
- <1% CPU usage when idle

#### **Reliability**
- Rust's memory safety guarantees
- Comprehensive error handling
- Graceful fallbacks for network errors
- Type-safe TypeScript frontend
- Automatic retry for palette loading

#### **Compatibility**
- Windows 10/11 (64-bit)
- No dependencies required
- WebView2 auto-installed
- Portable executable (~15MB)
- Or use NSIS installer for full integration

### 📦 Distribution

#### **Two Distribution Options**

**Option 1: NSIS Installer**
- Professional Windows installer
- Automatic WebView2 installation
- Start menu shortcuts
- Clean uninstall support
- Windows registry integration

**Option 2: Portable Executable**
- Single ~15MB .exe file
- Run from anywhere (USB, Downloads, etc.)
- No installation required
- Just double-click and go

#### **What's Included**
- Tauri runtime (Rust + WebView)
- React frontend (compiled)
- Windows API integration
- Palette fetching system
- Calibration system
- Complete UI

### 🆕 What's New in 3.0.0

✅ **Complete rewrite** in Tauri + React + Rust
✅ **500+ professional palettes** (5x more than v2.0)
✅ **Native performance** (<1s startup, instant palette switching)
✅ **Modern React UI** (dark theme, smooth animations)
✅ **Tiny executable** (~15MB vs ~50MB + Python)
✅ **No dependencies** (self-contained, no Python needed)
✅ **Professional installer** (NSIS with WebView2)
✅ **Better architecture** (Rust safety + React reactivity)
✅ **Async operations** (non-blocking palette loading)
✅ **Type safety** (TypeScript frontend, Rust backend)

### 📊 Version Comparison

| Feature | v1.0 (Python) | v2.0 (Python) | v3.0 (Tauri) |
|---------|---------------|---------------|---------------|
| Technology | Python/Tkinter | Python/Tkinter | Rust/React |
| Palette Count | ~20 | 100+ | 500+ |
| Startup Time | ~3-5s | ~3-5s | <1s |
| File Size | ~50MB | ~50MB | ~15MB |
| Dependencies | Python + libs | Python + libs | None |
| UI Framework | Tkinter | Tkinter | React 18 |
| Performance | Medium | Medium | Native/Fast |
| Memory Usage | ~150MB | ~150MB | ~50MB |
| Distribution | PyInstaller | PyInstaller | Tauri/NSIS |
| Type Safety | No | No | Full (TS+Rust) |

### 🎨 Color Palettes Source

**nice-color-palettes** (GitHub)
- 500 curated color combinations
- Used by professional designers worldwide
- Proven harmonious color relationships
- Covers all styles: vibrant, pastel, dark, light, warm, cool
- Each palette has 5 colors (perfect for our use case)

### 💡 Usage Tips

1. **Keep generating**: With 500+ palettes, keep clicking until you find the perfect one
2. **Mix and match**: Apply colors in any order you like
3. **Recalibrate if needed**: If colors don't apply correctly, recalibrate
4. **Use windowed mode**: BoomBang works best in windowed mode for this tool
5. **Internet required**: First run needs internet to fetch palettes (then cached)

### 🔮 Future Possibilities

- **macOS/Linux support** (Tauri is cross-platform)
- **Palette favorites** (save your preferred palettes)
- **Palette history** (see previously generated palettes)
- **Custom palette upload** (use your own color schemes)
- **Export palettes** (to JSON, CSS, image files)
- **Color blind modes** (deuteranopia, protanopia, tritanopia)
- **Gradient generator** (smooth transitions between colors)
- **Hotkey support** (keyboard shortcuts for common actions)
- **Multiple game support** (adapt to other games with color wheels)
- **Auto-update** (built-in update checker)

### 🛠️ Development

#### **For Developers**
```bash
cd boombang-palette-app
npm install
npm run tauri dev    # Development mode
npm run tauri build  # Production build
```

#### **Project Structure**
- `src/` - React frontend (TypeScript)
- `src-tauri/` - Rust backend (Tauri)
- `src-tauri/src/main.rs` - Main Rust logic
- `src/App.tsx` - Main React component
- `vite.config.ts` - Vite configuration
- `tauri.conf.json` - Tauri app configuration

#### **Key Technologies**
- **Tauri 2.0**: Desktop app framework
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **windows-rs**: Windows API bindings
- **reqwest**: HTTP client
- **tokio**: Async runtime
- **serde**: Serialization
