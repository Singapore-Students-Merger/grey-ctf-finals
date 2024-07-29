const fs = require('fs');

// Function to write a ULEB128 number into a buffer
function writeUleb128(value) {
  const bytes = [];
  do {
    let byte = value & 0x7F; // Get the last 7 bits
    value >>>= 7;            // Logical right shift by 7 bits
    if (value !== 0) {       // More bytes to come
      byte |= 0x80;          // Set the MSB to 1
    }
    bytes.push(byte);
  } while (value !== 0);
  return Buffer.from(bytes);
}

// Function to create a custom section with specified data length
function createCustomSection(buffer, sectionId, contentBytes) {
  // Section ID
  const idBuffer = Buffer.from([sectionId]);
  
  // Section Size (encoded in ULEB128)
  const sizeBuffer = writeUleb128(contentBytes.length);
  
  // Full section buffer
  const sectionBuffer = Buffer.concat([idBuffer, sizeBuffer]);

  // Add the new section to the existing buffer
  return Buffer.concat([buffer, sectionBuffer]);
}

// Example usage: Create a WASM file with a custom section
const wasmFilePath = __dirname + "/grader/test2.wasm";
const initialBuffer = fs.readFileSync(__dirname + "/grader/test.wasm"); // Existing WASM file
const customSectionId = 0x00; // Section ID for a custom section
const dataLength = 604; // 664 bytes of data
const dataContent = Buffer.alloc(dataLength, 0); // 664 bytes filled with zeros (or any other data)

// Add the custom section to the WASM file
const updatedBuffer = createCustomSection(initialBuffer, customSectionId, dataContent);

// Save the updated WASM file
fs.writeFileSync(wasmFilePath, updatedBuffer);

console.log('Custom section with 664 bytes added successfully');
