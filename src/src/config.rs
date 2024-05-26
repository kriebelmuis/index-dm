use std::fs::File;
use std::{collections::HashMap, env, fs};
use std::io::{Read, Write, Result};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    pub opts: HashMap<String, serde_json::Value>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            opts: HashMap::new(),
        }
    }
}

impl Config {
    pub fn load() -> Result<Self> {
        let mut file = File::open(format!("{}/conf.json", env::var("AppData").expect("APP_DATA not found")))?;
        let mut contents = String::new();

        file.read_to_string(&mut contents)?;

		println!("{}", contents);
        let config: Config = serde_json::from_str(&contents)?;
        Ok(config)
    }

    pub fn save(&self) -> Result<()> {
        let mut file = fs::File::create(env::var("AppData").expect("APP_DATA not found"))?;
        file.write_all(serde_json::to_string(self)?.as_bytes())?;
        Ok(())
    }

    pub fn edit(&mut self, key: String, value: serde_json::Value) -> Result<()> {
        self.opts.insert(key, value);
        self.save()?;
        Ok(())
    }
}

pub fn new() -> Config {
	Config::load().unwrap_or_default()
}