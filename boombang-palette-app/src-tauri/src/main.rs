// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;
use rand::seq::SliceRandom;
use rand::thread_rng;
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct ColorPalette {
    colors: Vec<[f64; 3]>, // HSV values
    name: String,
}

#[derive(Default)]
struct AppState {
    calibration: Mutex<Option<CalibrationData>>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct CalibrationData {
    center_x: i32,
    center_y: i32,
    radius: i32,
    brightness_x_start: i32,
    brightness_x_end: i32,
    brightness_y: i32,
}

fn get_cache_path() -> Result<PathBuf, String> {
    let cache_dir = dirs::cache_dir()
        .ok_or("Failed to get cache directory")?;
    let app_cache = cache_dir.join("boombang-palette");

    // Create cache directory if it doesn't exist
    fs::create_dir_all(&app_cache)
        .map_err(|e| format!("Failed to create cache directory: {}", e))?;

    Ok(app_cache.join("palettes_cache.json"))
}

fn load_from_cache() -> Result<Vec<Vec<String>>, String> {
    let cache_path = get_cache_path()?;

    if !cache_path.exists() {
        return Err("Cache file does not exist".to_string());
    }

    let cache_content = fs::read_to_string(&cache_path)
        .map_err(|e| format!("Failed to read cache: {}", e))?;

    serde_json::from_str(&cache_content)
        .map_err(|e| format!("Failed to parse cache: {}", e))
}

fn save_to_cache(data: &Vec<Vec<String>>) -> Result<(), String> {
    let cache_path = get_cache_path()?;

    let json = serde_json::to_string(data)
        .map_err(|e| format!("Failed to serialize cache: {}", e))?;

    fs::write(&cache_path, json)
        .map_err(|e| format!("Failed to write cache: {}", e))?;

    Ok(())
}

#[tauri::command]
fn load_palettes() -> Result<Vec<ColorPalette>, String> {
    // Try to load from cache first
    let data = match load_from_cache() {
        Ok(cached_data) => {
            println!("Loaded palettes from cache");
            cached_data
        }
        Err(_) => {
            // Cache miss or error, fetch from GitHub
            println!("Cache miss, fetching from GitHub...");

            let url = "https://raw.githubusercontent.com/Jam3/nice-color-palettes/master/1000.json";

            let client = reqwest::blocking::Client::builder()
                .timeout(std::time::Duration::from_secs(10))
                .build()
                .map_err(|e| format!("Failed to create client: {}", e))?;

            let response = client.get(url).send()
                .map_err(|e| format!("Failed to fetch palettes: {}", e))?;
            // Check HTTP status code
            let status = response.status();
            if !status.is_success() {
                return Err(format!("HTTP error: {} - {}. Try again in a few minutes.",
                    status.as_u16(),
                    status.canonical_reason().unwrap_or("Unknown")));
            }

            // Try to get response text first for better error reporting
            let text = response.text()
                .map_err(|e| format!("Failed to read response text: {}", e))?;

            // Try to parse the JSON
            let fetched_data = serde_json::from_str::<Vec<Vec<String>>>(&text)
                .map_err(|e| {
                    let preview = if text.len() > 200 {
                        format!("{}...", &text[..200])
                    } else {
                        text.clone()
                    };
                    format!("Failed to parse JSON: {}. Response preview: {}", e, preview)
                })?;

            // Save to cache for future use
            if let Err(e) = save_to_cache(&fetched_data) {
                println!("Warning: Failed to save cache: {}", e);
            } else {
                println!("Palettes cached successfully");
            }

            fetched_data
        }
    };

    // Convert raw data to ColorPalette structs
    let mut palettes: Vec<ColorPalette> = data
        .into_iter()
        .enumerate()
        .filter_map(|(i, hex_colors)| {
            if hex_colors.len() >= 5 {
                let colors: Vec<[f64; 3]> = hex_colors[..5]
                    .iter()
                    .filter_map(|hex| hex_to_hsv(hex))
                    .collect();

                if colors.len() == 5 {
                    Some(ColorPalette {
                        colors,
                        name: format!("Palette {}", i + 1),
                    })
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect();

    if palettes.is_empty() {
        return Err("No valid palettes found in response".to_string());
    }

    // Shuffle palettes randomly every time they're loaded
    let mut rng = thread_rng();
    palettes.shuffle(&mut rng);

    Ok(palettes)
}

fn hex_to_hsv(hex: &str) -> Option<[f64; 3]> {
    let hex = hex.trim_start_matches('#');
    
    if hex.len() != 6 {
        return None;
    }
    
    let r = u8::from_str_radix(&hex[0..2], 16).ok()? as f64 / 255.0;
    let g = u8::from_str_radix(&hex[2..4], 16).ok()? as f64 / 255.0;
    let b = u8::from_str_radix(&hex[4..6], 16).ok()? as f64 / 255.0;
    
    let max = r.max(g).max(b);
    let min = r.min(g).min(b);
    let delta = max - min;
    
    let h = if delta == 0.0 {
        0.0
    } else if max == r {
        ((g - b) / delta % 6.0) / 6.0
    } else if max == g {
        ((b - r) / delta + 2.0) / 6.0
    } else {
        ((r - g) / delta + 4.0) / 6.0
    };
    
    let s = if max == 0.0 { 0.0 } else { delta / max };
    let v = max;
    
    Some([h.rem_euclid(1.0), s, v])
}

#[tauri::command]
fn save_calibration(state: State<AppState>, calibration: CalibrationData) -> Result<(), String> {
    // Validate calibration data
    if calibration.radius <= 0 || calibration.radius > 1000 {
        return Err("Invalid radius value".to_string());
    }
    if calibration.brightness_x_start >= calibration.brightness_x_end {
        return Err("Invalid brightness range".to_string());
    }
    
    let mut cal = state.calibration.lock().map_err(|e| e.to_string())?;
    *cal = Some(calibration);
    Ok(())
}

#[tauri::command]
fn get_calibration(state: State<AppState>) -> Result<Option<CalibrationData>, String> {
    let cal = state.calibration.lock().map_err(|e| e.to_string())?;
    Ok(cal.clone())
}

#[derive(Serialize)]
struct MousePosition {
    x: i32,
    y: i32,
}

#[tauri::command]
fn get_mouse_position() -> Result<MousePosition, String> {
    #[cfg(target_os = "windows")]
    {
        use windows::Win32::UI::WindowsAndMessaging::GetCursorPos;
        use windows::Win32::Foundation::POINT;
        
        unsafe {
            let mut point = POINT { x: 0, y: 0 };
            GetCursorPos(&mut point).map_err(|e| e.to_string())?;
            Ok(MousePosition {
                x: point.x,
                y: point.y,
            })
        }
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        Err("This feature is only available on Windows".to_string())
    }
}

#[tauri::command]
async fn apply_color_to_game(
    state: State<'_, AppState>,
    h: f64,
    s: f64,
    v: f64,
) -> Result<(), String> {
    // Validate input parameters
    if !(0.0..=1.0).contains(&h) || !(0.0..=1.0).contains(&s) || !(0.0..=1.0).contains(&v) {
        return Err("Invalid HSV values. Must be between 0 and 1".to_string());
    }
    
    let calibration = {
        let cal = state.calibration.lock().map_err(|e| e.to_string())?;
        cal.clone().ok_or("No calibration data available")?  
    };

    #[cfg(target_os = "windows")]
    {
        // Run all Windows API calls in a blocking thread to avoid Send issues
        tokio::task::spawn_blocking(move || {
            use windows::Win32::Foundation::*;
            use windows::Win32::UI::WindowsAndMessaging::*;
            use windows::Win32::Graphics::Gdi::ScreenToClient;
            
            // Find BoomBang window
            let hwnd = unsafe {
                let window_name = windows::core::w!("BoomBang");
                FindWindowW(None, window_name).map_err(|e| e.to_string())?
            };
            
            if hwnd.0 == std::ptr::null_mut() {
                return Err("BoomBang window not found".to_string());
            }
            
            // Calculate color wheel position
            // Based on the BoomBang color wheel image:
            // - Red (H=0) is at the right (0° or 3 o'clock)
            // - Green (H=0.33) is at upper-left 
            // - Blue (H=0.67) is at lower-left
            // Standard wheel: 0° is to the right, angles increase counter-clockwise
            let angle = h * 2.0 * std::f64::consts::PI;
            let distance = s * calibration.radius as f64;
            
            // For standard color wheel with red at 0° (right):
            // x = center + distance * cos(angle)
            // y = center + distance * sin(angle)
            // But screen Y increases downward, so we need to negate sin
            let wheel_x_screen = calibration.center_x + (distance * angle.cos()) as i32;
            let wheel_y_screen = calibration.center_y - (distance * angle.sin()) as i32;
            
            // MOVE CURSOR TO WHEEL POSITION (like Python: pyautogui.moveTo)
            unsafe {
                let _ = SetCursorPos(wheel_x_screen, wheel_y_screen);
            }
            
            std::thread::sleep(std::time::Duration::from_millis(150));
            
            // Convert screen coordinates to client coordinates
            let mut wheel_point = POINT { x: wheel_x_screen, y: wheel_y_screen };
            unsafe {
                let _ = ScreenToClient(hwnd, &mut wheel_point);
            }
            
            // Click on color wheel
            unsafe {
                let lparam_wheel = LPARAM((wheel_point.y << 16 | (wheel_point.x & 0xFFFF)) as isize);
                SendMessageW(hwnd, WM_LBUTTONDOWN, Some(WPARAM(win32con::MK_LBUTTON as usize)), Some(lparam_wheel));
                std::thread::sleep(std::time::Duration::from_millis(100));
                SendMessageW(hwnd, WM_LBUTTONUP, Some(WPARAM(0)), Some(lparam_wheel));
            }
            
            // Wait for color wheel click to register
            std::thread::sleep(std::time::Duration::from_millis(500));
            
            // Calculate brightness slider target position
            let target_brightness_x = calibration.brightness_x_start 
                + (v * (calibration.brightness_x_end - calibration.brightness_x_start) as f64) as i32;
            
            // Python finds current slider position by scanning the screen
            // We'll approximate by assuming it's at full brightness (rightmost position)
            // This makes sense because after selecting a color from the wheel, 
            // the slider is usually at maximum brightness
            let slider_current_x = calibration.brightness_x_end;
            
            // MOVE CURSOR TO SLIDER POSITION FIRST (like Python: pyautogui.moveTo)
            unsafe {
                let _ = SetCursorPos(slider_current_x, calibration.brightness_y);
            }
            
            std::thread::sleep(std::time::Duration::from_millis(150));
            
            // Convert current slider position to client coordinates and send mouse down
            let mut slider_start_point = POINT { x: slider_current_x, y: calibration.brightness_y };
            unsafe {
                let _ = ScreenToClient(hwnd, &mut slider_start_point);
            }
            
            // Mouse down on current slider position
            unsafe {
                let lparam_start = LPARAM((slider_start_point.y << 16 | (slider_start_point.x & 0xFFFF)) as isize);
                SendMessageW(hwnd, WM_LBUTTONDOWN, Some(WPARAM(win32con::MK_LBUTTON as usize)), Some(lparam_start));
            }
            
            std::thread::sleep(std::time::Duration::from_millis(50));
            
            // Drag slider in steps from current position to target
            // IMPORTANT: Like Python, we need to PHYSICALLY move the cursor AND send messages
            let steps = 10;
            for i in 1..=steps {
                // Calculate intermediate position in SCREEN coordinates
                let intermediate_x_screen = slider_current_x + ((target_brightness_x - slider_current_x) * i / steps);
                
                // MOVE THE PHYSICAL CURSOR (like pyautogui.moveTo)
                unsafe {
                    let _ = SetCursorPos(intermediate_x_screen, calibration.brightness_y);
                }
                
                std::thread::sleep(std::time::Duration::from_millis(20));
                
                // Convert to client coordinates for the message
                let mut drag_point = POINT { x: intermediate_x_screen, y: calibration.brightness_y };
                unsafe {
                    let _ = ScreenToClient(hwnd, &mut drag_point);
                    let lparam = LPARAM((drag_point.y << 16 | (drag_point.x & 0xFFFF)) as isize);
                    SendMessageW(hwnd, WM_MOUSEMOVE, Some(WPARAM(win32con::MK_LBUTTON as usize)), Some(lparam));
                }
                
                std::thread::sleep(std::time::Duration::from_millis(20));
            }
            
            // Mouse up at final position
            let mut final_point = POINT { x: target_brightness_x, y: calibration.brightness_y };
            unsafe {
                let _ = ScreenToClient(hwnd, &mut final_point);
                let lparam_end = LPARAM((final_point.y << 16 | (final_point.x & 0xFFFF)) as isize);
                SendMessageW(hwnd, WM_LBUTTONUP, Some(WPARAM(0)), Some(lparam_end));
            }
            
            std::thread::sleep(std::time::Duration::from_millis(300));
            
            Ok::<(), String>(())
        }).await.map_err(|e| format!("Thread join error: {}", e))?
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        Err("This feature is only available on Windows".to_string())
    }
}

// Windows constants module
mod win32con {
    pub const MK_LBUTTON: i32 = 0x0001;
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![
            load_palettes,
            save_calibration,
            get_calibration,
            get_mouse_position,
            apply_color_to_game
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
