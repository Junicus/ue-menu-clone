use crate::file::{compress, decompress};
use crate::settings;
use std::path::Path;
use tauri::AppHandle;
use tauri::Manager;

#[tauri::command]
pub async fn show_window(window: tauri::Window) {
    window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
pub async fn save_settings(app: AppHandle, settings_state: String) {
    let settings_file = settings::get_settings_path(app);
    compress(&settings_file, &settings_state);
}

#[tauri::command]
pub async fn load_settings(app: AppHandle) -> Option<serde_json::Value> {
    let settings_file = settings::get_settings_path(app);
    if Path::new(&settings_file).exists() {
        let content = decompress(&settings_file);
        let json: serde_json::Value =
            serde_json::from_str(&content).expect("Unable to parse settings state");
        return Some(json);
    }

    None
}

pub fn get_handlers() -> Box<dyn Fn(tauri::Invoke<tauri::Wry>) + Send + Sync> {
    Box::new(tauri::generate_handler![
        show_window,
        save_settings,
        load_settings
    ])
}
