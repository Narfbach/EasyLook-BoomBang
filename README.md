# BoomBang Color Palette Generator v3.0

Generador profesional de paletas de colores con **500+ paletas** que se integra directamente con el juego BoomBang. Construido con Tauri + React + Rust para rendimiento nativo.

![Version](https://img.shields.io/badge/version-3.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)
![Tech](https://img.shields.io/badge/tech-Tauri%20%2B%20React%20%2B%20Rust-orange)

## Características Principales

- **500+ Paletas Profesionales** - Desde nice-color-palettes (GitHub)
- **Interfaz Moderna** - React con diseño oscuro profesional
- **Integración Directa** - Windows API para control preciso
- **Ejecutable Nativo** - Compilado con Tauri (Rust + WebView)
- **Calibración Precisa** - Sistema de 4 pasos con ENTER
- **Sin Dependencias** - No requiere Python ni Node.js instalado
- **Ligero y Rápido** - Ejecutable de ~15MB
- **Visualización Completa** - HEX, RGB y HSV para cada color

## Inicio Rápido

### Para Usuarios

1. Descarga el instalador desde: `boombang-palette-app/src-tauri/target/release/bundle/nsis/BoomBang Color Palette_3.0.0_x64-setup.exe`
2. Ejecuta el instalador
3. Abre la aplicación
4. Calibra y usa

**O usa el ejecutable portable:**
- `boombang-palette-app/src-tauri/target/release/boombang-palette.exe`

### Para Desarrolladores

```bash
cd boombang-palette-app

# Instalar dependencias
npm install

# Modo desarrollo
npm run tauri dev

# Compilar release
npm run tauri build
```

## Cómo Usar

### 1. Calibración (Primera vez)

Abre BoomBang con la rueda de colores visible:

1. Click en **"Calibrate"**
2. Posiciona el mouse en el **CENTRO** de la rueda → Presiona **ENTER**
3. Posiciona el mouse en el **BORDE** de la rueda → Presiona **ENTER**
4. Posiciona el mouse en el **INICIO** de la barra de brillo → Presiona **ENTER**
5. Posiciona el mouse en el **FIN** de la barra de brillo → Presiona **ENTER**

### 2. Usar Paletas

1. Click en **"Generate New Palette"**
2. Click en cualquier color para aplicarlo al juego
3. Los colores aplicados se marcan con un indicador verde
4. Genera nuevas paletas cuando quieras

## Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Rust con Tauri 2.0
- **Windows API**: windows-rs crate
- **Networking**: reqwest para cargar paletas
- **Async**: tokio runtime
- **Paletas**: nice-color-palettes (GitHub)

## Compilar desde Código

### Requisitos
- Node.js 18+
- Rust 1.70+
- Visual Studio Build Tools (Windows)

### Comandos

```bash
cd boombang-palette-app

# Desarrollo
npm run tauri dev

# Release
npm run tauri build
```

**Ubicación de archivos:**
- Ejecutable: `src-tauri/target/release/boombang-palette.exe`
- Instalador: `src-tauri/target/release/bundle/nsis/BoomBang Color Palette_3.0.0_x64-setup.exe`

## Estructura del Proyecto

```
color-picker/
├── boombang-palette-app/           # Aplicación Tauri
│   ├── src/                        # Frontend React
│   │   ├── App.tsx                 # Componente principal
│   │   ├── App.css                 # Estilos
│   │   └── main.tsx                # Entry point
│   ├── src-tauri/                  # Backend Rust
│   │   ├── src/main.rs             # Lógica principal
│   │   ├── Cargo.toml              # Dependencias Rust
│   │   └── tauri.conf.json         # Configuración Tauri
│   ├── package.json
│   └── vite.config.ts
├── old_python_version/             # Versión anterior (backup)
├── backup_v2.0_python/             # Backup v2.0
├── README.md
├── CHANGELOG.md
└── FEATURES.md
```

## Requisitos

### Para Usuarios
- Windows 10/11
- BoomBang game
- WebView2 (instalado automáticamente)

### Para Desarrollo
- Node.js 18+
- Rust 1.70+
- Visual Studio Build Tools

## Comparación de Versiones

| Característica | v2.0 (Python) | v3.0 (Tauri) |
|----------------|---------------|---------------|
| Paletas | 100+ | 500+ |
| Tecnología | Python + Tkinter | Rust + React |
| Tamaño | ~50MB + Python | ~15MB nativo |
| Inicio | ~3-5s | <1s |
| Dependencias | Python + libs | Ninguna |
| UI | Tkinter | React moderno |
| Performance | Media | Alta |

## Solución de Problemas

**No encuentra ventana BoomBang:**
- Asegúrate de que el juego esté abierto
- La ventana debe llamarse "BoomBang"
- Abre la rueda de colores en el juego

**Los colores no se aplican correctamente:**
- Haz una nueva calibración (botón "Recalibrate")
- Calibra con mayor precisión
- Asegúrate de que el juego esté en primer plano

**Error al cargar paletas:**
- Requiere conexión a internet (primera vez)
- Las paletas se cargan desde GitHub

## Créditos

- Paletas de [nice-color-palettes](https://github.com/Jam3/nice-color-palettes)
- Built with [Tauri](https://tauri.app/)
- UI con React 18

---

**Versión 3.0.0** - Generador Profesional de Paletas de Colores | Tauri + React + Rust

Made with love <3 - Fran
