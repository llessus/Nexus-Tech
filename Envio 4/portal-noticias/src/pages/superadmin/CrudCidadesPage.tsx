import { useState } from 'react';
import { useNavigate } from 'react-router';
import { cidades } from '../../data/cidades';
import { ufs } from '../../data/ufs';
import { noticias } from '../../data/noticias';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const CrudCidadesPage = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [ufFiltro, setUfFiltro] = useState('');
  const filtradas = cidades.filter(c => {
    if (busca && !c.nome.toLowerCase().includes(busca.toLowerCase())) return false;
    if (ufFiltro && c.ufId !== Number(ufFiltro)) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Cidades</h2>
        <Button onClick={() => navigate('/admin/cidades/nova')}>+ Nova Cidade</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input className="input-field" placeholder="Buscar..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex: 1 }} />
        <select className="input-field" value={ufFiltro} onChange={e => setUfFiltro(e.target.value)} style={{ width: '200px' }}><option value="">Todas UFs</option>{ufs.map(u => <option key={u.id} value={u.id}>{u.sigla}</option>)}</select>
      </div>
      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>ID</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Nome</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>UF</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Notícias</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
          </tr></thead>
          <tbody>{filtradas.map(c => {
            const uf = ufs.find(u => u.id === c.ufId);
            return (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem 1rem' }}>{c.id}</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{c.nome}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{uf?.sigla}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{noticias.filter(n => n.cidadeId === c.id).length}</td>
                <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => navigate(`/admin/cidades/${c.id}/editar`)} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => alert('Excluída!')} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Excluir</button>
                </td>
              </tr>
            );
          })}</tbody>
        </table>
      </Card>
    </div>
  );
};
