import { useState } from 'react';
import { Link } from 'react-router';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ufs } from '../../data/ufs';
import { cidades } from '../../data/cidades';

export const CadastroPage = () => {
  const [ufSelecionada, setUfSelecionada] = useState('');
  const cidadesFiltradas = cidades.filter(c => c.ufId === Number(ufSelecionada));

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Criar Conta</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Preencha os dados abaixo</p>
        <form onSubmit={e => e.preventDefault()}>
          <InputField label="Nome Completo" placeholder="Seu nome completo" />
          <InputField label="E-mail" type="email" placeholder="seu@email.com" />
          <InputField label="Senha" type="password" placeholder="Mínimo 8 caracteres" />
          <InputField label="Confirmar Senha" type="password" placeholder="Repita a senha" />
          <div className="input-group">
            <label className="input-label">UF</label>
            <select className="input-field" value={ufSelecionada} onChange={e => setUfSelecionada(e.target.value)}>
              <option value="">Selecione a UF</option>
              {ufs.map(u => <option key={u.id} value={u.id}>{u.sigla} - {u.nome}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Cidade</label>
            <select className="input-field" disabled={!ufSelecionada}>
              <option value="">Selecione a cidade</option>
              {cidadesFiltradas.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Bio (opcional)</label>
            <textarea className="input-field" rows={3} placeholder="Conte um pouco sobre você..." style={{ resize: 'vertical' }} />
          </div>
          <Button type="button" fullWidth>Criar Conta</Button>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
            Já tem conta? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Faça login</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
