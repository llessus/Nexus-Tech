import { useParams, useNavigate, Link } from 'react-router';
import { noticias } from '../../data/noticias';
import { ufs } from '../../data/ufs';
import { tags } from '../../data/tags';
import { usuarios } from '../../data/usuarios';
import { Card } from '../../components/ui/Card';
import { TagBadge } from '../../components/ui/TagBadge';

export const BuscaPorUFPage = () => {
  const { sigla } = useParams<{ sigla: string }>();
  const navigate = useNavigate();
  const uf = ufs.find(u => u.sigla.toLowerCase() === sigla?.toLowerCase());
  const noticiasUF = noticias.filter(n => {
    const cidadeId = n.cidadeId;
    const ufDoNoticia = ufs.find(u => u.id === Math.ceil(cidadeId / 2)); // simplified mapping
    return ufDoNoticia?.sigla.toLowerCase() === sigla?.toLowerCase() && n.publicada;
  });
  const getTags = (tagIds: number[]) => tags.filter(t => tagIds.includes(t.id));
  const getAutor = (id: number) => usuarios.find(u => u.id === id)?.nome || 'Desconhecido';

  return (
    <div>
      <div style={{ padding: '0.75rem 0', backgroundColor: '#fff', borderBottom: '1px solid #eee', marginBottom: '2rem' }}>
        <div className="container" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> &gt; Busca por UF &gt; <strong>{uf?.nome || sigla}</strong>
        </div>
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>{uf?.nome || sigla} — {noticiasUF.length} notícias</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            {noticiasUF.length === 0 && <p style={{ color: 'var(--text-muted)' }}>Nenhuma notícia encontrada para esta UF.</p>}
            {noticiasUF.map(n => (
              <Card key={n.id} onClick={() => navigate(`/noticia/${n.id}`)}>
                <div style={{ height: '160px', backgroundImage: `url(${n.imagemCapa})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>{getTags(n.tags).map(t => <TagBadge key={t.id} tag={t} />)}</div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{n.titulo}</h3>
                  <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>{getAutor(n.autorId)} • {new Date(n.criadoEm).toLocaleDateString('pt-BR')}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <aside>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Estados</h3>
          {ufs.map(u => (
            <Link key={u.id} to={`/busca/uf/${u.sigla}`} style={{ display: 'block', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: u.sigla.toLowerCase() === sigla?.toLowerCase() ? 'var(--color-primary)' : 'transparent', color: u.sigla.toLowerCase() === sigla?.toLowerCase() ? '#fff' : 'inherit', fontWeight: u.sigla.toLowerCase() === sigla?.toLowerCase() ? 600 : 400, fontSize: '0.875rem' }}>
              {u.sigla} - {u.nome}
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
};
