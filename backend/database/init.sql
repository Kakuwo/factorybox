-- backend/database/init.sql

-- Usuários do sistema (operadores e administradores)
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  funcao_id INTEGER,
  FOREIGN KEY (funcao_id) REFERENCES funcoes(id)
);

-- Funções dos usuários (ex: operador, supervisor, etc.)
CREATE TABLE IF NOT EXISTS funcoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);

-- Pedidos realizados
CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT NOT NULL,
  status TEXT NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  operador_id INTEGER,
  FOREIGN KEY (operador_id) REFERENCES usuarios(id)
);

-- Histórico de pedidos
CREATE TABLE IF NOT EXISTS historico_pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id INTEGER,
  status_anterior TEXT,
  status_novo TEXT,
  data DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Estoque físico
CREATE TABLE IF NOT EXISTS estoque (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_item TEXT NOT NULL,
  quantidade INTEGER NOT NULL,
  unidade TEXT
);
