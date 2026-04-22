import { useNavigate, Link } from 'react-router';
import { Card } from '../../components/ui/Card';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Card style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.75rem' }}>PORTAL<span style={{ color: 'var(--color-secondary)' }}>NEWS</span></h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Acesse sua conta</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <InputField label="E-mail" type="email" placeholder="seu@email.com" />
          <InputField label="Senha" type="password" placeholder="••••••••" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" /> Lembrar-me
            </label>
            <Link to="/lembrar-senha" style={{ color: 'var(--color-primary)' }}>Esqueci minha senha</Link>
          </div>

          <Button type="button" fullWidth onClick={() => navigate('/leitor/perfil')}>Entrar</Button>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
            <Link to="/cadastro">Não tem conta? <strong style={{ color: 'var(--color-primary)' }}>Cadastre-se</strong></Link>
          </div>
        </form>
      </Card>

      <div style={{ width: '100%', maxWidth: '500px', border: '2px solid red', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#fff' }}>
        <h4 style={{ textAlign: 'center', color: 'red', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.875rem' }}>
          Acesso Rápido (Desenvolvimento)
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button onClick={() => navigate('/leitor/perfil')} style={{ border: '2px solid red', background: '#fff', color: 'red', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer' }}>LEITOR</button>
          <button onClick={() => navigate('/autor/noticias')} style={{ border: '2px solid red', background: '#fff', color: 'red', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer' }}>AUTOR</button>
          <button onClick={() => navigate('/editor/painel')} style={{ border: '2px solid red', background: '#fff', color: 'red', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer' }}>EDITOR</button>
          <button onClick={() => navigate('/admin/dashboard')} style={{ border: '2px solid red', background: '#fff', color: 'red', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer' }}>SUPERADMIN</button>
        </div>
      </div>
    </div>
  );
};
