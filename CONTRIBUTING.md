# Contributing to BoomBang Color Palette Generator

¡Gracias por tu interés en contribuir! 🎨

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Versión de la aplicación
- Sistema operativo y versión
- Screenshots si es posible

### Sugerir Mejoras

¿Tienes una idea para mejorar la aplicación? Abre un issue describiendo:
- La mejora propuesta
- Por qué sería útil
- Ejemplos de uso si es aplicable

### Pull Requests

1. **Fork el repositorio**
2. **Crea una rama** para tu feature: `git checkout -b feature/mi-feature`
3. **Haz tus cambios** y commit: `git commit -am 'Add: nueva característica'`
4. **Push a tu fork**: `git push origin feature/mi-feature`
5. **Abre un Pull Request**

### Configuración de Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/color-picker.git
cd color-picker/boombang-palette-app

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run tauri dev

# Compilar para producción
npm run tauri build
```

### Requisitos

- **Node.js** 18 o superior
- **Rust** 1.70 o superior
- **Visual Studio Build Tools** (Windows)
- Editor de código (recomendado: VS Code)

### Estructura del Código

```
boombang-palette-app/
├── src/                    # Frontend React
│   ├── App.tsx            # Componente principal
│   ├── App.css            # Estilos
│   └── main.tsx           # Entry point
├── src-tauri/             # Backend Rust
│   ├── src/
│   │   └── main.rs        # Lógica Tauri
│   ├── Cargo.toml         # Dependencias Rust
│   └── tauri.conf.json    # Config Tauri
```

### Estándares de Código

#### TypeScript/React
- Usa TypeScript estricto
- Componentes funcionales con hooks
- Nombres descriptivos para variables y funciones
- Comentarios para lógica compleja

#### Rust
- Sigue las convenciones de Rust (rustfmt)
- Manejo de errores con Result<T, E>
- Documentación con `///` para funciones públicas
- Tests unitarios cuando sea posible

### Formato de Commits

Usa prefijos descriptivos:
- `Add:` - Nueva característica
- `Fix:` - Corrección de bug
- `Update:` - Actualización de funcionalidad existente
- `Refactor:` - Refactorización sin cambio de funcionalidad
- `Docs:` - Cambios en documentación
- `Style:` - Cambios de formato/estilo

Ejemplo:
```
Add: support for custom color palettes
Fix: calibration not saving on first attempt
Update: improve color wheel detection accuracy
```

### Testing

Antes de hacer un PR:
1. Verifica que la app compile sin warnings
2. Prueba la funcionalidad manualmente
3. Verifica que el instalador se genere correctamente
4. Prueba en una instalación limpia de Windows

### Áreas que Necesitan Ayuda

- 🎨 **UI/UX**: Mejoras en el diseño e interfaz
- 🐛 **Bug Fixes**: Corrección de bugs reportados
- 📚 **Documentación**: Mejorar guías y documentación
- 🧪 **Testing**: Agregar tests automatizados
- 🌍 **i18n**: Soporte multi-idioma
- 🍎 **macOS/Linux**: Soporte para otras plataformas

## Código de Conducta

- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Ayuda a otros contribuidores

## Preguntas

¿Tienes preguntas? Abre un issue con la etiqueta `question`.

---

¡Gracias por contribuir! 🚀
