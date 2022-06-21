use std::fs::File;
use std::io::{Read, Write};

pub fn compress(filename: &str, content: &str) -> bool {
    let mut writer = brotli::CompressorWriter::new(File::create(filename).unwrap(), 4096, 11, 22);
    write!(&mut writer, "{}", content).expect("Could not compress content");
    return true;
}

pub fn decompress(filename: &str) -> String {
    let mut reader = brotli::Decompressor::new(File::open(filename).unwrap(), 4096);
    let mut data = String::new();
    reader
        .read_to_string(&mut data)
        .expect("Could not decompress content");
    return data;
}
