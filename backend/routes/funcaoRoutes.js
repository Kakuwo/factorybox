// backend/routes/funcaoRoutes.js

const express = require('express');
const router = express.Router();
const {
  cadastrarFuncao,
  listarFuncoes,
  listarOperadores
} = require('../controllers/funcaoController');

// Rotas
router.post('/funcao', cadastrarFuncao);
router.get('/funcoes', listarFuncoes);
router.get('/operadores', listarOperadores);

module.exports = router;
