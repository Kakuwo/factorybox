import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [historicoVisivel, setHistoricoVisivel] = useState({});
  const [historico, setHistorico] = useState({});
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Carregar pedidos
  const carregarPedidos = async () => {
    const res = await api.get('/pedidos');
    setPedidos(res.data);
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  // Criar novo pedido
  const criarPedido = async (e) => {
    e.preventDefault();
    if (!descricao) return;

    await api.post('/pedido', {
      descricao,
      operador_id: usuario.id
    });

    setDescricao('');
    carregarPedidos();
  };

  // Atualizar status
  const alterarStatus = async (id, novo_status) => {
    await api.put(`/pedido/${id}/status`, { novo_status });
    carregarPedidos();
  };

  // Mostrar/ocultar histórico
  const mostrarHistorico = async (id) => {
    if (historicoVisivel[id]) {
      setHistoricoVisivel(prev => ({ ...prev, [id]: false }));
      return;
    }

    try {
      const res = await api.get(`/pedido/${id}/historico`);
      setHistorico(prev => ({ ...prev, [id]: res.data }));
      setHistoricoVisivel(prev => ({ ...prev, [id]: true }));
    } catch (err) {
      console.error('Erro ao buscar histórico', err);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: '2rem' }}>
          <h2>Pedidos</h2>

          {/* Formulário */}
          <form onSubmit={criarPedido} style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Descrição do pedido"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <button type="submit">Cadastrar</button>
          </form>

          <hr />

          {/* Lista de pedidos */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pedidos.map((pedido) => (
              <li key={pedido.id} style={{ marginBottom: '1.5rem' }}>
                <strong>#{pedido.id}</strong> - {pedido.descricao} <br />
                <span>Status: <b>{pedido.status}</b></span> <br />
                <span>Operador: {pedido.operador}</span> <br />

                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => alterarStatus(pedido.id, 'Em produção')} style={{ marginRight: '0.5rem' }}>
                    Em produção
                  </button>
                  <button onClick={() => alterarStatus(pedido.id, 'Finalizado')} style={{ marginRight: '0.5rem' }}>
                    Finalizar
                  </button>
                  <button onClick={() => mostrarHistorico(pedido.id)}>
                    {historicoVisivel[pedido.id] ? 'Ocultar histórico' : 'Ver histórico'}
                  </button>
                </div>

                {/* Histórico */}
                {historicoVisivel[pedido.id] && historico[pedido.id] && (
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: '#ccc' }}>
                    {historico[pedido.id].map((item, index) => (
                      <li key={index}>
                        [{new Date(item.data).toLocaleString()}]
                        {item.status_anterior
                          ? ` ${item.status_anterior} → ${item.status_novo}`
                          : ` Criado como ${item.status_novo}`}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
