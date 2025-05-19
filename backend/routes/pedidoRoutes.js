// backend/routes/pedidoRoutes.js

const express = require('express');
const router = express.Router();
const {
  criarPedido,
  listarPedidos,
  atualizarStatus,
  historicoPedido
} = require('../controllers/pedidoController');

// Rotas
router.post('/pedido', criarPedido);
router.get('/pedidos', listarPedidos);
router.put('/pedido/:id/status', atualizarStatus);
router.get('/pedido/:id/historico', historicoPedido);

module.exports = router;
