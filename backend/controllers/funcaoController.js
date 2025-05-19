// backend/controllers/funcaoController.js

const db = require('../database/db');

// Cadastrar nova função
const cadastrarFuncao = (req, res) => {
  const { nome } = req.body;
  const sql = `INSERT INTO funcoes (nome) VALUES (?)`;

  db.run(sql, [nome], function (err) {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao cadastrar função' });
    }
    res.status(201).json({ id: this.lastID, nome });
  });
};

// Listar funções
const listarFuncoes = (req, res) => {
  const sql = `SELECT * FROM funcoes`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao listar funções' });
    }
    res.status(200).json(rows);
  });
};

// Listar operadores e suas funções
const listarOperadores = (req, res) => {
  const sql = `
    SELECT u.id, u.nome, u.email, f.nome AS funcao
    FROM usuarios u
    LEFT JOIN funcoes f ON u.funcao_id = f.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao listar operadores' });
    }
    res.status(200).json(rows);
  });
};

module.exports = { cadastrarFuncao, listarFuncoes, listarOperadores };
