import { useState } from 'react';
import { Link } from 'react-router';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';
import { ufs } from '../../data/ufs';
import { cidades } from '../../data/cidades';
import { Card } from '../../components/ui/Card';

export const CrudNoticiasPage = () => {
  const [busca, setBusca] = useState('');
  const [statusF, setStatusF] = useState('');
  const [ufF, setUfF] = useState('');
  const [autorF, setAutorF] = useState('');

  const autores = usuarios.filter(u => u.perfil === 'AUTOR');

  const filtradas = noticias.filter(n => {
    if (busca && !n.titulo.toLowerCase().includes(busca.toLowerCase())) return false;
    if (statusF === 'pub' && !n.publicada) return false;
    if (statusF === 'ras' && n.publicada) return false;
    if (ufF) {
      const cidade = cidades.find(c => c.id === n.cidadeId);
      if (!cidade || cidade.ufId !== Number(ufF)) return false;
    }
    if (autorF && n.autorId !== Number(autorF)) return false;
    return true;
  });

  const getUFSigla = (cidadeId: number) => {
    const cidade = cidades.find(c => c.id === cidadeId);
    const uf = cidade ? ufs.find(u => u.id === cidade.ufId) : null;
    return uf?.sigla || '—';
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Notícias</h2>

      {/* Filtros: SearchBar, Select Status, Select UF, Select Autor */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input className="input-field" placeholder="Buscar..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex: 1, minWidth: '200px' }} />
        <select className="input-field" value={statusF} onChange={e => setStatusF(e.target.value)} style={{ width: '150px' }}>
          <option value="">Todos Status</option>
          <option value="pub">Publicadas</option>
          <option value="ras">Rascunhos</option>
        </select>
        <select className="input-field" value={ufF} onChange={e => setUfF(e.target.value)} style={{ width: '120px' }}>
          <option value="">Todas UFs</option>
          {ufs.map(u => <option key={u.id} value={u.id}>{u.sigla}</option>)}
        </select>
        <select className="input-field" value={autorF} onChange={e => setAutorF(e.target.value)} style={{ width: '180px' }}>
          <option value="">Todos Autores</option>
          {autores.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
        </select>
      </div>

      {/* Tabela: ID, Título, Autor, UF, Status, Data, Visualizações, Ações */}
      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>ID</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Título</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Autor</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>UF</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Data</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Views</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
          </tr></thead>
          <tbody>{filtradas.map(n => (
            <tr key={n.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 1rem' }}>{n.id}</td>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 500, maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.titulo}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{usuarios.find(u => u.id === n.autorId)?.nome}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600 }}>{getUFSigla(n.cidadeId)}</td>
              <td style={{ padding: '0.75rem 1rem' }}><span style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, backgroundColor: n.publicada ? '#d4edda' : '#fff3cd', color: n.publicada ? '#155724' : '#856404' }}>{n.publicada ? 'Publicada' : 'Rascunho'}</span></td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.813rem' }}>{new Date(n.criadoEm).toLocaleDateString('pt-BR')}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{n.visualizacoes.toLocaleString()}</td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/noticia/${n.id}`} title="Visualizar">👁</Link>
                  <Link to={`/admin/noticias/${n.id}/editar`} title="Editar">✏️</Link>
                  <span style={{ cursor: 'pointer' }} title={n.publicada ? 'Despublicar' : 'Publicar'} onClick={() => alert(n.publicada ? 'Despublicada!' : 'Publicada!')}>{n.publicada ? '📤' : '📥'}</span>
                  <span style={{ cursor: 'pointer' }} title="Excluir" onClick={() => alert('Excluída!')}>🗑️</span>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
};
