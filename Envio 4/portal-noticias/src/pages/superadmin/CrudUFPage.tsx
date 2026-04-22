import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ufs } from '../../data/ufs';
import { cidades } from '../../data/cidades';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const CrudUFPage = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const filtradas = ufs.filter(u => u.nome.toLowerCase().includes(busca.toLowerCase()) || u.sigla.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Unidades Federativas</h2>
        <Button onClick={() => navigate('/admin/ufs/nova')}>+ Nova UF</Button>
      </div>
      <input className="input-field" placeholder="Buscar UF..." value={busca} onChange={e => setBusca(e.target.value)} style={{ marginBottom: '1.5rem', maxWidth: '400px' }} />
      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>ID</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Sigla</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Nome</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Cidades</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
          </tr></thead>
          <tbody>{filtradas.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 1rem' }}>{u.id}</td>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{u.sigla}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{u.nome}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{cidades.filter(c => c.ufId === u.id).length}</td>
              <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => navigate(`/admin/ufs/${u.id}/editar`)} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Editar</button>
                <button onClick={() => alert('UF excluída!')} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
};
