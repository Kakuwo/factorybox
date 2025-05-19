const express = require('express');
const router = express.Router();
const {
  cadastrarItem,
  listarEstoque,
  atualizarQuantidade,
  editarItem,
  listarHistorico
} = require('../controllers/estoqueController');

router.post('/estoque', cadastrarItem);
router.get('/estoque', listarEstoque);
router.put('/estoque/:id/quantidade', atualizarQuantidade);
router.put('/estoque/:id/editar', editarItem);
router.get('/estoque/:id/historico', listarHistorico);

module.exports = router;
