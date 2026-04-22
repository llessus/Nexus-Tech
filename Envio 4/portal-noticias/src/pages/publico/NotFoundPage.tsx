import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
      <h1 style={{ fontSize: '8rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>404</h1>
      <h2 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Página não encontrada</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>A página que você procura não existe ou foi removida.</p>
      <Link to="/" style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'inline-block' }}>Voltar para Home</Link>
    </div>
  );
};
