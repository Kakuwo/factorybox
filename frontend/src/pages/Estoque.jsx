import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Estoque() {
  const [itens, setItens] = useState([]);
  const [nome_item, setNomeItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [historico, setHistorico] = useState({});
  const [historicoVisivel, setHistoricoVisivel] = useState({});
  const [editandoId, setEditandoId] = useState(null);

  const QUANTIDADE_MINIMA = 10;

  const carregarEstoque = async () => {
    const res = await api.get('/estoque');
    setItens(res.data);
  };

  useEffect(() => {
    carregarEstoque();
  }, []);

  const cadastrarItem = async (e) => {
    e.preventDefault();
    if (!nome_item || !unidade || (!editandoId && !quantidade)) return;

    if (editandoId) {
      await api.put(`/estoque/${editandoId}/editar`, {
        nome_item,
        unidade
      });
      setEditandoId(null);
    } else {
      await api.post('/estoque', {
        nome_item,
        quantidade: parseInt(quantidade),
        unidade
      });
    }

    setNomeItem('');
    setQuantidade('');
    setUnidade('');
    carregarEstoque();
  };

  const atualizarQuantidade = async (id, tipo) => {
    const valor = prompt(`Digite a quantidade para ${tipo === 'entrada' ? 'entrar' : 'sair'}:`);
    const numero = parseInt(valor);
    if (isNaN(numero) || numero <= 0) return;

    await api.put(`/estoque/${id}/quantidade`, {
      tipo,
      quantidade: numero
    });

    carregarEstoque();
  };

  const buscarHistorico = async (id) => {
    // toggle exibição
    const mostrar = !historicoVisivel[id];
    setHistoricoVisivel((prev) => ({ ...prev, [id]: mostrar }));

    if (!mostrar) return;

    try {
      const res = await api.get(`/estoque/${id}/historico`);
      setHistorico((prev) => ({ ...prev, [id]: res.data }));
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const editarItem = (item) => {
    setEditandoId(item.id);
    setNomeItem(item.nome_item);
    setUnidade(item.unidade);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: '2rem' }}>
          <h2>Estoque</h2>

          {/* Formulário */}
          <form onSubmit={cadastrarItem} style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Nome do item"
              value={nome_item}
              onChange={(e) => setNomeItem(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            {!editandoId && (
              <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
            )}
            <input
              type="text"
              placeholder="Unidade (ex: un, kg)"
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <button type="submit">{editandoId ? 'Salvar edição' : 'Cadastrar item'}</button>
            {editandoId && (
              <button
                type="button"
                onClick={() => {
                  setEditandoId(null);
                  setNomeItem('');
                  setUnidade('');
                }}
                style={{ marginLeft: '0.5rem' }}
              >
                Cancelar
              </button>
            )}
          </form>

          <hr />

          {/* Lista de itens */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {itens.map((item) => (
              <li key={item.id} style={{ marginBottom: '1.5rem' }}>
                <strong>{item.nome_item}</strong> —{' '}
                <span
                  style={{
                    color: item.quantidade < QUANTIDADE_MINIMA ? 'red' : '#fff',
                    fontWeight: 'bold'
                  }}
                >
                  {item.quantidade} {item.unidade}
                </span>
                <br />
                <button
                  onClick={() => atualizarQuantidade(item.id, 'entrada')}
                  style={{ marginRight: '0.5rem' }}
                >
                  Entrada
                </button>
                <button
                  onClick={() => atualizarQuantidade(item.id, 'saida')}
                  style={{ marginRight: '0.5rem' }}
                >
                  Saída
                </button>
                <button
                  onClick={() => editarItem(item)}
                  style={{ marginRight: '0.5rem' }}
                >
                  Editar
                </button>
                <button onClick={() => buscarHistorico(item.id)}>
                  {historicoVisivel[item.id] ? 'Ocultar histórico' : 'Ver histórico'}
                </button>

                {/* Histórico */}
                {historicoVisivel[item.id] && historico[item.id] && (
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: '#ccc' }}>
                    {historico[item.id].map((mov, i) => (
                      <li key={i}>
                        [{new Date(mov.data).toLocaleString('pt-BR', {
                          timeZone: 'America/Sao_Paulo'
                        })}] {mov.tipo === 'entrada' ? '+' : '-'}
                        {mov.quantidade} {item.unidade}
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
