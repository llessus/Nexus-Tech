import { useState } from 'react';
import { Link } from 'react-router';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const LembrarSenhaPage = () => {
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Card style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Recuperar Senha</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Digite seu e-mail para redefinir sua senha.</p>
        {!enviado ? (
          <form onSubmit={e => { e.preventDefault(); setEnviado(true); }}>
            <InputField label="E-mail" type="email" placeholder="seu@email.com" />
            <Button type="submit" fullWidth>Enviar</Button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '1.125rem', marginBottom: '1rem' }}>✓ E-mail enviado com sucesso!</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Verifique sua caixa de entrada para redefinir sua senha.</p>
          </div>
        )}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Voltar para Login</Link>
        </p>
      </Card>
    </div>
  );
};
