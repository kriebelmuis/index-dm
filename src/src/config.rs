use serde::Serialize;

#[derive(Serialize)]
struct Config {
   dht: bool
}

pub fn write_config(data: &str) -> Result<(), std::io::Error> {
	std::fs::write("config.toml", data)
}
