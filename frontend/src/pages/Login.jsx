import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await api.post('/auth/login', { email, senha });
      const { usuario } = response.data;

      // Armazena o usuário no localStorage (simples por enquanto)
      localStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/dashboard');
    } catch (err) {
      setErro('Login inválido. Verifique seus dados.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login - FactoryBOX</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label><br />
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </form>
    </div>
  );
}

export default Login;
