import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--text-inverse)', padding: '3rem 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
          PORTAL<span style={{ color: 'var(--text-inverse)' }}>NEWS</span>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/">Sobre</Link>
          <Link to="/">Contato</Link>
          <Link to="/">Termos de Uso</Link>
          <Link to="/">Privacidade</Link>
        </nav>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} Portal News. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
