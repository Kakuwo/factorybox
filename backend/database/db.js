// backend/database/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco
const dbPath = path.resolve(__dirname, 'factorybox.db');

// Conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err.message);
  } else {
    console.log('Banco de dados conectado com sucesso!');
  }
});

module.exports = db;
