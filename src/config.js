const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'inventory.db');
const PORT = Number(process.env.PORT) || 3000;

module.exports = {
  ROOT_DIR,
  DATA_DIR,
  DB_PATH,
  PORT,
};
