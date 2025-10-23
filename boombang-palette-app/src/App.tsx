import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import './App.css'

interface ColorPalette {
  colors: [number, number, number][];
  name: string;
}

interface CalibrationData {
  center_x: number;
  center_y: number;
  radius: number;
  brightness_x_start: number;
  brightness_x_end: number;
  brightness_y: number;
}

function App() {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Loading palettes...');
  const [calibrated, setCalibrated] = useState(false);
  const [appliedColors, setAppliedColors] = useState<Set<number>>(new Set());
  const [calibrating, setCalibrating] = useState(false);
  const [usedPaletteIndices, setUsedPaletteIndices] = useState<Set<number>>(new Set());
  const [favorites, setFavorites] = useState<ColorPalette[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    loadPalettes();
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const saveFavorites = (newFavorites: ColorPalette[]) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const toggleFavorite = () => {
    if (!currentPalette) return;

    const isFavorite = favorites.some(f => f.name === currentPalette.name);

    if (isFavorite) {
      saveFavorites(favorites.filter(f => f.name !== currentPalette.name));
    } else {
      saveFavorites([...favorites, currentPalette]);
    }
  };

  const isFavorite = currentPalette ? favorites.some(f => f.name === currentPalette.name) : false;

  const loadPalettes = async () => {
    try {
      setLoading(true);
      setStatus('Loading palettes...');
      const result = await invoke<ColorPalette[]>('load_palettes');
      setPalettes(result);
      setStatus('Ready to calibrate');
      setLoading(false);
    } catch (error) {
      setStatus(`Error: ${error}`);
      setLoading(false);
    }
  };

  const generateRandomPalette = () => {
    if (palettes.length === 0) return;
    
    // If all palettes have been used, reset the used list
    if (usedPaletteIndices.size >= palettes.length) {
      setUsedPaletteIndices(new Set());
    }
    
    // Find unused palette indices
    const availableIndices = palettes
      .map((_, index) => index)
      .filter(index => !usedPaletteIndices.has(index));
    
    if (availableIndices.length === 0) {
      // This shouldn't happen due to the reset above, but just in case
      setUsedPaletteIndices(new Set());
      const randomIndex = Math.floor(Math.random() * palettes.length);
      setCurrentPalette(palettes[randomIndex]);
      setUsedPaletteIndices(new Set([randomIndex]));
    } else {
      // Pick a random unused palette
      const randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices[randomAvailableIndex];
      
      setCurrentPalette(palettes[selectedIndex]);
      setUsedPaletteIndices(prev => new Set([...prev, selectedIndex]));
    }
    
    setAppliedColors(new Set());
    setStatus(`Palette ${usedPaletteIndices.size + 1}/${palettes.length}`);
  };

  const startCalibration = async () => {
    setCalibrating(true);
    setStatus('Step 1: Position mouse on CENTER of color wheel, then press ENTER');
    
    const calibData: Partial<CalibrationData> = {};
    
    const step1 = () => new Promise<void>((resolve) => {
      const handler = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const pos = await invoke<{x: number, y: number}>('get_mouse_position').catch(() => ({x: 0, y: 0}));
          calibData.center_x = Math.round(pos.x);
          calibData.center_y = Math.round(pos.y);
          setStatus(`Center captured (${pos.x}, ${pos.y}) | Position on EDGE, press ENTER`);
          document.removeEventListener('keydown', handler);
          resolve();
        }
      };
      document.addEventListener('keydown', handler);
    });
    
    const step2 = () => new Promise<void>((resolve) => {
      const handler = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const pos = await invoke<{x: number, y: number}>('get_mouse_position').catch(() => ({x: 0, y: 0}));
          if (calibData.center_x !== undefined && calibData.center_y !== undefined) {
            const dx = pos.x - calibData.center_x;
            const dy = pos.y - calibData.center_y;
            calibData.radius = Math.round(Math.sqrt(dx * dx + dy * dy));
            setStatus(`Radius: ${calibData.radius}px | Position on LEFT of brightness bar, press ENTER`);
          }
          document.removeEventListener('keydown', handler);
          resolve();
        }
      };
      document.addEventListener('keydown', handler);
    });
    
    const step3 = () => new Promise<void>((resolve) => {
      const handler = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const pos = await invoke<{x: number, y: number}>('get_mouse_position').catch(() => ({x: 0, y: 0}));
          calibData.brightness_x_start = Math.round(pos.x);
          calibData.brightness_y = Math.round(pos.y);
          setStatus('Left captured | Position on RIGHT of brightness bar, press ENTER');
          document.removeEventListener('keydown', handler);
          resolve();
        }
      };
      document.addEventListener('keydown', handler);
    });
    
    const step4 = () => new Promise<void>((resolve) => {
      const handler = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const pos = await invoke<{x: number, y: number}>('get_mouse_position').catch(() => ({x: 0, y: 0}));
          calibData.brightness_x_end = Math.round(pos.x);
          document.removeEventListener('keydown', handler);
          resolve();
        }
      };
      document.addEventListener('keydown', handler);
    });
    
    try {
      await step1();
      await step2();
      await step3();
      await step4();
      
      if (calibData.center_x !== undefined && 
          calibData.center_y !== undefined && 
          calibData.radius !== undefined &&
          calibData.brightness_x_start !== undefined &&
          calibData.brightness_x_end !== undefined &&
          calibData.brightness_y !== undefined) {
        
        await invoke('save_calibration', {
          calibration: calibData as CalibrationData
        });
        
        setCalibrated(true);
        setCalibrating(false);
        setStatus('Calibration complete! Ready to generate palettes');
      }
    } catch (error) {
      setStatus(`Calibration error: ${error}`);
      setCalibrating(false);
    }
  };

  const applyColor = async (index: number) => {
    if (!currentPalette || !calibrated) {
      setStatus('Please calibrate first!');
      return;
    }

    try {
      const [h, s, v] = currentPalette.colors[index];
      setStatus(`Applying Color ${index + 1}...`);
      
      await invoke('apply_color_to_game', {
        h,
        s,
        v
      });
      
      const newApplied = new Set(appliedColors).add(index);
      setAppliedColors(newApplied);
      
      const appliedCount = newApplied.size;
      setStatus(`Color ${index + 1} applied successfully! (${appliedCount}/5)`);
      
      if (appliedCount >= 5) {
        setStatus('All colors applied! You can generate a new palette or re-apply colors');
      }
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };



  const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r: number, g: number, b: number;

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
      default: r = 0; g = 0; b = 0;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <header>
        <img src="/logo.png" alt="Easy Look" className="logo" />
        <p className="subtitle">for BoomBang</p>
      </header>

      <div className="status-bar">
        <div className="status-icon">●</div>
        <div className="status-text">{status}</div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading palettes...</p>
        </div>
      ) : (
        <>
          <div className="controls">
            <button
              className="btn-primary"
              onClick={generateRandomPalette}
              disabled={palettes.length === 0 || !calibrated}
            >
              Generate New Palette
            </button>
            <button
              className="btn-secondary"
              onClick={startCalibration}
              disabled={calibrating}
            >
              {calibrating ? 'Calibrating...' : (calibrated ? 'Recalibrate' : 'Calibrate')}
            </button>
            <button
              className="btn-favorites"
              onClick={() => setShowFavorites(!showFavorites)}
            >
              ★ Favorites ({favorites.length})
            </button>
          </div>

          {showFavorites && (
            <div className="favorites-panel">
              <h2>Saved Palettes</h2>
              {favorites.length === 0 ? (
                <p className="empty-favorites">No favorites yet. Click the ★ button to save a palette!</p>
              ) : (
                <div className="favorites-grid">
                  {favorites.map((palette, idx) => (
                    <div
                      key={idx}
                      className="favorite-item"
                      onClick={() => {
                        setCurrentPalette(palette);
                        setShowFavorites(false);
                        setAppliedColors(new Set());
                      }}
                    >
                      <div className="favorite-colors">
                        {palette.colors.map((hsv, i) => {
                          const [r, g, b] = hsvToRgb(hsv[0], hsv[1], hsv[2]);
                          const hex = rgbToHex(r, g, b);
                          return <div key={i} style={{ backgroundColor: hex }} className="favorite-color-dot" />;
                        })}
                      </div>
                      <button
                        className="remove-favorite"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveFavorites(favorites.filter((_, i) => i !== idx));
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentPalette && !showFavorites && (
            <div className="palette-display">
              <div className="palette-header">
                <h2>{currentPalette.name}</h2>
                <button
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={toggleFavorite}
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
              </div>
              <div className="colors-grid">
                {currentPalette.colors.map((hsv, index) => {
                  const [r, g, b] = hsvToRgb(hsv[0], hsv[1], hsv[2]);
                  const hex = rgbToHex(r, g, b);
                  
                  return (
                    <div 
                      key={index} 
                      className={`color-card ${appliedColors.has(index) ? 'applied' : ''}`}
                      onClick={() => applyColor(index)}
                      style={{ cursor: calibrated ? 'pointer' : 'default' }}
                    >
                      <div 
                        className="color-preview" 
                        style={{ backgroundColor: hex }}
                      />
                      <div className="color-info">
                        <span className="color-name">
                          Color {index + 1}
                        </span>
                        <span className="color-hex">{hex}</span>
                        <span className="color-rgb">RGB({r}, {g}, {b})</span>
                        <span className="color-hsv">HSV({hsv[0].toFixed(2)}, {hsv[1].toFixed(2)}, {hsv[2].toFixed(2)})</span>
                      </div>
                      {appliedColors.has(index) && (
                        <div className="status-indicator" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <footer>
        <p>v3.0.0 | Powered by bachi</p>
      </footer>
    </div>
  )
}

export default App
