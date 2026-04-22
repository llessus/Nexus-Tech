import { useState } from 'react';
import { Link } from 'react-router';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';
import { Card } from '../../components/ui/Card';

export const PainelEditorPage = () => {
  const [busca, setBusca] = useState('');
  const [statusF, setStatusF] = useState('');

  const filtradas = noticias.filter(n => {
    if (busca && !n.titulo.toLowerCase().includes(busca.toLowerCase())) return false;
    if (statusF === 'pub' && !n.publicada) return false;
    if (statusF === 'ras' && n.publicada) return false;
    return true;
  });

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Painel do Editor</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input className="input-field" placeholder="Buscar notícia..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex: 1, minWidth: '200px' }} />
        <select className="input-field" value={statusF} onChange={e => setStatusF(e.target.value)} style={{ width: '160px' }}>
          <option value="">Todos Status</option>
          <option value="pub">Publicadas</option>
          <option value="ras">Rascunhos</option>
        </select>
      </div>

      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Título</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Autor</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Data</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
          </tr></thead>
          <tbody>{filtradas.map(n => (
            <tr key={n.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 500, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.titulo}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{usuarios.find(u => u.id === n.autorId)?.nome}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{new Date(n.criadoEm).toLocaleDateString('pt-BR')}</td>
              <td style={{ padding: '0.75rem 1rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: n.publicada ? '#d4edda' : '#fff3cd', color: n.publicada ? '#155724' : '#856404' }}>{n.publicada ? 'Publicada' : 'Rascunho'}</span></td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/noticia/${n.id}`} title="Visualizar">👁</Link>
                  <Link to={`/editor/noticias/${n.id}/editar`} title="Editar">✏️</Link>
                  <Link to={`/editor/publicar/${n.id}`} title={n.publicada ? 'Despublicar' : 'Publicar'}>{n.publicada ? '📤' : '📥'}</Link>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
};
