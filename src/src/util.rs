pub enum PrintType {
	Info,
	Error,
	Warn,
}

pub fn print(str: &str, print: PrintType) {
	match print {
		PrintType::Info => println!("# {}", str),
		PrintType::Error => println!("! {}", str),
		PrintType::Warn => println!("? {}", str),
	}
}