//read the wasm as binary
const fs = require('fs');

function wasmToHex(filePath) {
  // Read the WASM file as a binary buffer
  const buffer = fs.readFileSync(filePath);

  // Convert the buffer to a hexadecimal string
  let hexString = '';
  for (let byte of buffer) {
    hexString += byte.toString(16).padStart(2, '0');
  }

  return hexString;
}

// Example usage
const wasmHex = wasmToHex(__dirname + "/grader/test2.wasm");
console.log(wasmHex);
