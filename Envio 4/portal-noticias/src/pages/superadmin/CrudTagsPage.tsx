import { useNavigate } from 'react-router';
import { tags } from '../../data/tags';
import { noticias } from '../../data/noticias';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { TagBadge } from '../../components/ui/TagBadge';

export const CrudTagsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Tags</h2>
        <Button onClick={() => navigate('/admin/tags/nova')}>+ Nova Tag</Button>
      </div>
      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>ID</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Nome</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Slug</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Notícias</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.813rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
          </tr></thead>
          <tbody>{tags.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 1rem' }}>{t.id}</td>
              <td style={{ padding: '0.75rem 1rem' }}><TagBadge tag={t} /></td>
              <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>{t.slug}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{noticias.filter(n => n.tags.includes(t.id)).length}</td>
              <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => navigate(`/admin/tags/${t.id}/editar`)} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Editar</button>
                <button onClick={() => alert('Excluída!')} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
};
