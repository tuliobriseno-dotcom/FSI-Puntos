const sql = require('mssql');
const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), 'config.json');

let pool = null;

function loadConfig() {
  const raw = fs.readFileSync(configPath);
  const config = JSON.parse(raw);
  return config.sql;
}

async function getConnection() {

  try {

    if (pool) {
      return pool;
    }

    const config = loadConfig();

    pool = await sql.connect(config);

    pool.on('error', err => {
      console.error('SQL pool error:', err);
      pool = null;
    });

    return pool;

  } catch (err) {

    console.error('Error conectando a SQL:', err);
    pool = null;
    throw err;

  }

}

module.exports = { getConnection };