#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod file;
mod settings;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .setup(|app| {
            let handle = app.handle();
            settings::init(handle);
            Ok(())
        })
        .invoke_handler(commands::get_handlers())
        .run(context)
        .expect("error while running tauri application");
}
