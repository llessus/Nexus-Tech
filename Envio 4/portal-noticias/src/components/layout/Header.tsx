import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/Button';

export const Header = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="glass" style={{
      position: 'sticky', top: 0, zIndex: 100, height: 'var(--header-height)',
      display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.05em' }}>
          PORTAL<span style={{ color: 'var(--color-secondary)' }}>NEWS</span>
        </Link>

        {/* Menu Hambúrguer (Mobile) */}
        <button className="hamburger-btn" onClick={() => setMenuAberto(!menuAberto)} aria-label="Menu">
          <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: 'var(--text-main)', transition: 'all 0.3s', transform: menuAberto ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: 'var(--text-main)', transition: 'all 0.3s', opacity: menuAberto ? 0 : 1, margin: '5px 0' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: 'var(--text-main)', transition: 'all 0.3s', transform: menuAberto ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

        {/* Nav Desktop */}
        <nav className="nav-desktop" style={{ display: 'flex', gap: '2rem', fontWeight: 600, alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/login">Entrar</Link>
          <Link to="/cadastro">Cadastre-se</Link>
          <Button variant="primary" onClick={() => navigate('/login')}>Login</Button>
        </nav>

        {/* Nav Mobile */}
        {menuAberto && (
          <nav className="nav-mobile" onClick={() => setMenuAberto(false)}>
            <Link to="/">Home</Link>
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro">Cadastre-se</Link>
            <Button variant="primary" fullWidth onClick={() => navigate('/login')}>Login</Button>
          </nav>
        )}
      </div>
    </header>
  );
};
