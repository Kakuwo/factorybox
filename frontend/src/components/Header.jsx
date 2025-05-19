const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <header style={{
      background: '#333',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <h2>FactoryBOX</h2>
      <button onClick={handleLogout}>Sair</button>
    </header>
  );
};

export default Header;
