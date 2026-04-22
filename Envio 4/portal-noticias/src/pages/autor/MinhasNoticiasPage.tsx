import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { noticias } from '../../data/noticias';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const MinhasNoticiasPage = () => {
  const navigate = useNavigate();
  const autorId = 6; // Ana Silva
  const minhas = noticias.filter(n => n.autorId === autorId);
  const [filtro, setFiltro] = useState('todas');
  const [busca, setBusca] = useState('');

  const filtradas = minhas.filter(n => {
    if (filtro === 'publicadas' && !n.publicada) return false;
    if (filtro === 'rascunhos' && n.publicada) return false;
    if (busca && !n.titulo.toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Minhas Notícias</h2>
        <Button onClick={() => navigate('/autor/noticias/nova')}>+ Nova Notícia</Button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input className="input-field" placeholder="Buscar..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex: 1 }} />
        <select className="input-field" value={filtro} onChange={e => setFiltro(e.target.value)} style={{ width: '200px' }}>
          <option value="todas">Todas</option>
          <option value="publicadas">Publicadas</option>
          <option value="rascunhos">Rascunhos</option>
        </select>
      </div>

      {filtradas.length === 0 ? (
        <Card style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Você ainda não escreveu nenhuma notícia</p>
          <Button onClick={() => navigate('/autor/noticias/nova')}>Escrever Primeira Notícia</Button>
        </Card>
      ) : (
        <Card style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Título</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Data</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Views</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
            </tr></thead>
            <tbody>{filtradas.map(n => (
              <tr key={n.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{n.titulo}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{new Date(n.criadoEm).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '0.75rem 1rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: n.publicada ? '#d4edda' : '#fff3cd', color: n.publicada ? '#155724' : '#856404' }}>{n.publicada ? 'Publicada' : 'Rascunho'}</span></td>
                <td style={{ padding: '0.75rem 1rem' }}>{n.visualizacoes.toLocaleString()}</td>
                <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/noticia/${n.id}`} title="Ver" style={{ cursor: 'pointer' }}>👁</Link>
                  <Link to={`/autor/noticias/${n.id}/editar`} title="Editar" style={{ cursor: 'pointer' }}>✏️</Link>
                  <span title="Excluir" style={{ cursor: 'pointer' }} onClick={() => alert('Notícia excluída (simulação)')}>🗑️</span>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      )}
    </div>
  );
};
