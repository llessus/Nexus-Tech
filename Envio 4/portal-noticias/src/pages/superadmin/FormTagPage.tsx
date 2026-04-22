import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { tags } from '../../data/tags';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';

export const FormTagPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tag = id ? tags.find(t => t.id === Number(id)) : null;
  const [nome, setNome] = useState(tag?.nome || '');
  const slug = nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '2rem' }}>{tag ? `Editar Tag — ${tag.nome}` : 'Nova Tag'}</h2>
      <InputField label="Nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da tag" />
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Slug: <code style={{ backgroundColor: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{slug || '...'}</code></p>
      {nome && <div style={{ marginBottom: '1.5rem' }}><span style={{ padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary)', color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>{nome}</span></div>}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => { alert('Salvo!'); navigate('/admin/tags'); }}>Salvar</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/tags')}>Cancelar</Button>
      </div>
    </div>
  );
};
