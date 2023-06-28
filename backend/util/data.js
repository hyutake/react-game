const fs = require('node:fs/promises');

// temporary measure to store data - prolly will implement mongoose integration

async function readData() {
  const data = await fs.readFile('data.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('data.json', JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;