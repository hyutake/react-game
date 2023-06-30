const fs = require('node:fs/promises');

// temporary measure to store data - prolly will implement mongoose integration

async function readData(filename) {
  const data = await fs.readFile(filename, 'utf8');
  return JSON.parse(data);
}

async function writeData(filename, data) {
  await fs.writeFile(filename, JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;