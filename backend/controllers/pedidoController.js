// backend/controllers/pedidoController.js

const db = require('../database/db');

// Criar pedido
const criarPedido = (req, res) => {
  const { descricao, operador_id } = req.body;
  const status = 'Novo';

  const sql = `INSERT INTO pedidos (descricao, status, operador_id) VALUES (?, ?, ?)`;
  db.run(sql, [descricao, status, operador_id], function (err) {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao criar pedido' });
    }

    // Registra no histórico
    const historicoSql = `INSERT INTO historico_pedidos (pedido_id, status_anterior, status_novo) VALUES (?, ?, ?)`;
    db.run(historicoSql, [this.lastID, null, status]);

    res.status(201).json({ id: this.lastID, descricao, status });
  });
};

// Listar pedidos
const listarPedidos = (req, res) => {
  const sql = `
    SELECT p.id, p.descricao, p.status, p.data_criacao, u.nome AS operador
    FROM pedidos p
    LEFT JOIN usuarios u ON p.operador_id = u.id
    ORDER BY p.data_criacao DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar pedidos' });
    res.status(200).json(rows);
  });
};

// Atualizar status de um pedido
const atualizarStatus = (req, res) => {
  const { id } = req.params;
  const { novo_status } = req.body;

  const getStatusSql = `SELECT status FROM pedidos WHERE id = ?`;
  db.get(getStatusSql, [id], (err, row) => {
    if (err || !row) return res.status(404).json({ erro: 'Pedido não encontrado' });

    const anterior = row.status;
    const updateSql = `UPDATE pedidos SET status = ? WHERE id = ?`;

    db.run(updateSql, [novo_status, id], function (err) {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar status' });

      const historicoSql = `INSERT INTO historico_pedidos (pedido_id, status_anterior, status_novo) VALUES (?, ?, ?)`;
      db.run(historicoSql, [id, anterior, novo_status]);

      res.status(200).json({ id, status_atualizado: novo_status });
    });
  });
};

// Histórico de um pedido
const historicoPedido = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT status_anterior, status_novo, data
    FROM historico_pedidos
    WHERE pedido_id = ?
    ORDER BY data ASC
  `;

  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar histórico' });
    res.status(200).json(rows);
  });
};

module.exports = {
  criarPedido,
  listarPedidos,
  atualizarStatus,
  historicoPedido
};
