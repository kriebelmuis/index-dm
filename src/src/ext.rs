use std::env;
use std::error::Error;
use std::ffi::CString;
use std::fs;
use std::mem;
use std::os::raw::c_char;
use std::path::PathBuf;
use winapi::um::libloaderapi::{GetProcAddress, LoadLibraryA};

enum ExtTypes {
    Indexer,
}

pub trait Extension {
    fn init(&self);
    fn stop(&self);

    fn version(&self) -> u8;
    fn developer(&self) -> &'static str;
    fn ext_type(&self) -> ExtTypes;
}

enum ItemTypes {
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

fn get_home_directory() -> Option<PathBuf> {
    if let Some(home_dir) = env::var_os("HOME") {
        return Some(PathBuf::from(home_dir));
    }
    if cfg!(windows) {
        if let Some(user_profile) = env::var_os("USERPROFILE") {
            return Some(PathBuf::from(user_profile));
        }
    }
    None
}

fn init() {
    let mut extensions: Vec<Box<dyn Extension>> = Vec::new();
    let mut app_data = get_home_directory().expect("couldn't get home directory");
    app_data.push("Index/extensions");

    for ext in fs::read_dir(app_data).expect("failed to read extensions dir").flatten() {
        let path = ext.path();
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
