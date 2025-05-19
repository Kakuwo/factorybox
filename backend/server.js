const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middlewares globais (ANTES DAS ROTAS!)
app.use(cors());
app.use(express.json()); // <- ESSENCIAL para capturar JSON do req.body

// Importação de rotas
const authRoutes = require('./routes/authRoutes');
const funcaoRoutes = require('./routes/funcaoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');


// Registro de rotas
app.use('/api/auth', authRoutes);
app.use('/api', funcaoRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', estoqueRoutes);

// Inicializar o banco (somente na primeira execução)
const db = require('./database/db');
const initSql = fs.readFileSync('./database/init.sql', 'utf8');
db.exec(initSql, (err) => {
  if (err) {
    console.error('Erro ao inicializar o banco:', err.message);
  } else {
    console.log('Tabelas criadas com sucesso!');
  }
});

// Start
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
