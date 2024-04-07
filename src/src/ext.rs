use std::env;
use std::ffi::CString;
use std::fs;
use std::mem;
use std::path::PathBuf;
use winapi::um::libloaderapi::{GetProcAddress, LoadLibraryA};
use anyhow::Context;

pub enum ExtTypes {
    Indexer,
}

pub trait Extension {
    fn init(&self);
    fn stop(&self);

    fn version(&self) -> u8;
    fn developer(&self) -> &'static str;
    fn ext_type(&self) -> ExtTypes;
}

pub enum ItemTypes {
    Movies,
    Television,
    Games,
    Music,
    Applications,
    Anime,
    Documentaries,
    Other,
}

pub struct SearchResponse {
    item_name: &'static str,
    item_type: ItemTypes,
    seed_ratio: u8, // 0 - 100
}

pub trait Indexer: Extension {
    fn search(&self, query: &str) -> Vec<SearchResponse>;
    fn login(&self, username: &str, password: &str) -> bool;
}

pub fn init() {
    let mut extensions: Vec<Box<dyn Extension>> = Vec::new();
    let mut app_data = PathBuf::from(env::var("AppData").expect("APP_DATA not found"));
	app_data.push("Index/extensions");

	let _ = fs::create_dir_all(&app_data)
	 .context("couldn't create extensions directory");

    for file in fs::read_dir(app_data).unwrap() {
        let path = file.unwrap().path();
        if path.is_file() && path.extension().unwrap_or_default() == "dll" {
            let path_str = path.to_str().expect("invalid extension path");
            let extension = CString::new(path_str).expect("couldn't convert path to cstring");

            // Load the dynamic library
            let library = unsafe { LoadLibraryA(extension.as_ptr()) };
            if library.is_null() {
                return;
            }

            // Get the function pointer
            let symbol_name = CString::new("_get_addr").expect("couldn't convert symbol name to cstring");
            let get_addr = unsafe {
                let symbol = GetProcAddress(library, symbol_name.as_ptr());
                if symbol.is_null() {
                    return;
                }
                mem::transmute::<*mut _, unsafe extern "C" fn() -> *mut dyn Extension>(symbol)
            };

            // Call the function and get the pointer
            let extension_ptr = unsafe { get_addr() };
            if extension_ptr.is_null() {
                return;
            }

            // Convert the extension into a Box to save memory
            let extension: Box<dyn Extension> = unsafe { Box::from_raw(extension_ptr as *mut dyn Extension) };
			extensions.push(extension);
        }
    }
}
