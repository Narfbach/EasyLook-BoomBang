fn main() {
    tauri_build::try_build(
        tauri_build::Attributes::new().app_manifest(
            tauri_build::AppManifest::new().commands(&[
                "load_palettes",
                "save_calibration",
                "get_calibration",
                "get_mouse_position",
                "apply_color_to_game",
            ]),
        ),
    )
    .expect("failed to build tauri application");
}
