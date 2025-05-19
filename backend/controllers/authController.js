// backend/controllers/authController.js

const bcrypt = require('bcrypt');
const db = require('../database/db');

const SALT_ROUNDS = 10;

// Cadastro de usuário
const cadastrarUsuario = (req, res) => {
  const { nome, email, senha, funcao_id } = req.body;

  bcrypt.hash(senha, SALT_ROUNDS, (err, hash) => {
    if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha' });

    const sql = `INSERT INTO usuarios (nome, email, senha, funcao_id) VALUES (?, ?, ?, ?)`;
    const params = [nome, email, hash, funcao_id];

    db.run(sql, params, function (err) {
      if (err) return res.status(400).json({ erro: 'Erro ao cadastrar usuário' });
      res.status(201).json({ id: this.lastID, nome, email });
    });
  });
};

// Login de usuário
const loginUsuario = (req, res) => {
  const { email, senha } = req.body;

  const sql = `SELECT * FROM usuarios WHERE email = ?`;
  db.get(sql, [email], (err, usuario) => {
    if (err || !usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    bcrypt.compare(senha, usuario.senha, (err, resultado) => {
      if (resultado) {
        res.status(200).json({ mensagem: 'Login bem-sucedido', usuario: { id: usuario.id, nome: usuario.nome } });
      } else {
        res.status(401).json({ erro: 'Senha incorreta' });
      }
    });
  });
};

module.exports = { cadastrarUsuario, loginUsuario };
