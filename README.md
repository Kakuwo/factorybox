
🏭 FactoryBOX
=================================

Sistema simples e eficiente para **gestão de pedidos e controle de estoque em rede local**, ideal para pequenas fábricas, indústrias e oficinas.

Desenvolvido em **Node.js + SQLite** no backend e **React + Vite** no frontend.

----------------------------------------

🎥 Demonstração

[GIF 1: Fluxo de pedidos]
https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3Z6eWdpeG5tYXdlZmtmdmNjODI1OWFhZ2p2aG80ajVrbXRmY3Q0NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13FrpeVH09Zrb2/giphy.gif

[GIF 2: Controle de estoque]
https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGlzb3U2ZWJua25iNndhZm5nZmNsY3dmYTZ6dHlnaXRnd3hja2JydyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohs4BSacFKI7A717y/giphy.gif

----------------------------------------

✅ Funcionalidades

- Login de operadores com função
- Cadastro de pedidos com fluxo de status
- Histórico de alterações de pedidos
- Controle de estoque com entradas e saídas
- Histórico de movimentações do estoque
- Edição de itens do estoque
- Interface limpa e responsiva via navegador

----------------------------------------

🛠️ Tecnologias Utilizadas

Backend:
- Node.js + Express
- SQLite
- SQL puro

Frontend:
- React + Vite
- Axios
- React Router DOM

----------------------------------------

📦 Instalação e uso local

1. Clone o repositório

> git clone https://github.com/seu-usuario/factorybox.git  
> cd factorybox

2. Inicie o backend

> cd backend  
> npm install  
> npm start  

Servidor local em: http://localhost:3000

3. Inicie o frontend

> cd ../frontend  
> npm install  
> npm run dev  

Acesse via navegador: http://localhost:5173

----------------------------------------

🔐 Primeiro acesso

Crie um usuário pelo Postman:

POST http://localhost:3000/api/auth/cadastro

{
  "nome": "Administrador",
  "email": "admin@factorybox.com",
  "senha": "123456",
  "funcao_id": 1
}

----------------------------------------

📁 Estrutura do Projeto

factorybox/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── database/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/

----------------------------------------

📌 Roadmap (versões futuras)

- [ ] CRUD completo de usuários
- [ ] Integração direta entre pedidos e consumo de estoque
- [ ] Relatórios e indicadores por período
- [ ] Controle de permissões por função
- [ ] Deploy web ou empacotamento via Electron

----------------------------------------

