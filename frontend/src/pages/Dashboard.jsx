import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: '2rem' }}>
          <h2>Bem-vindo(a), {usuario?.nome || 'Usuário'}!</h2>
          <p>Escolha uma opção no menu para continuar.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
