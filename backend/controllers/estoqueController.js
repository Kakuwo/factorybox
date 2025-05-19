// backend/controllers/estoqueController.js

const db = require('../database/db');

// Cadastrar novo item
const cadastrarItem = (req, res) => {
  const { nome_item, quantidade, unidade } = req.body;

  const sql = `INSERT INTO estoque (nome_item, quantidade, unidade) VALUES (?, ?, ?)`;
  db.run(sql, [nome_item, quantidade, unidade], function (err) {
    if (err) return res.status(500).json({ erro: 'Erro ao cadastrar item' });
    res.status(201).json({ id: this.lastID, nome_item, quantidade, unidade });
  });
};

// Listar estoque
const listarEstoque = (req, res) => {
  const sql = `SELECT * FROM estoque ORDER BY nome_item`;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar estoque' });
    res.status(200).json(rows);
  });
};

// Atualizar quantidade (entrada ou saída)
const atualizarQuantidade = (req, res) => {
  const { id } = req.params;
  const { tipo, quantidade } = req.body;

  const operacao = tipo === 'entrada' ? '+' : tipo === 'saida' ? '-' : null;
  if (!operacao) return res.status(400).json({ erro: 'Tipo inválido (use entrada ou saida)' });

  const sql = `UPDATE estoque SET quantidade = quantidade ${operacao} ? WHERE id = ?`;

  db.run(sql, [quantidade, id], function (err) {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar quantidade' });

  // Gravar no histórico
  const dataBrasilia = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
  const historicoSql = `INSERT INTO historico_estoque (estoque_id, tipo, quantidade, data) VALUES (?, ?, ?, ?)`;
  db.run(historicoSql, [id, tipo, quantidade, dataBrasilia]);

    res.status(200).json({ mensagem: 'Quantidade atualizada com sucesso', id, tipo, quantidade });
  });
};

// Editar nome e unidade
const editarItem = (req, res) => {
  const { id } = req.params;
  const { nome_item, unidade } = req.body;

  const sql = `UPDATE estoque SET nome_item = ?, unidade = ? WHERE id = ?`;
  db.run(sql, [nome_item, unidade, id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao editar item' });
    }
    res.status(200).json({ mensagem: 'Item atualizado com sucesso' });
  });
};


// Listar histórico de movimentações
const listarHistorico = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT tipo, quantidade, data
    FROM historico_estoque
    WHERE estoque_id = ?
    ORDER BY data DESC
  `;

  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar histórico' });
    res.status(200).json(rows);
  });
};

module.exports = {
  cadastrarItem,
  listarEstoque,
  atualizarQuantidade,
  editarItem,
  listarHistorico
};
