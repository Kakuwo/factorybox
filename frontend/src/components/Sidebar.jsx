import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={{
      width: '200px',
      height: '100vh',
      background: '#1e1e1e',
      color: '#fff',
      padding: '1rem',
      boxSizing: 'border-box'
    }}>
      <h3>FactoryBOX</h3>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/dashboard" style={{ color: '#fff' }}>Dashboard</Link></li>
          <li><Link to="/pedidos" style={{ color: '#fff' }}>Pedidos</Link></li>
          <li><Link to="/estoque" style={{ color: '#fff' }}>Estoque</Link></li>
          <li><Link to="/usuarios" style={{ color: '#fff' }}>Usuários</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
