import { useParams, useNavigate } from 'react-router';
import { noticias } from '../../data/noticias';
import { tags } from '../../data/tags';
import { usuarios } from '../../data/usuarios';
import { Card } from '../../components/ui/Card';
import { TagBadge } from '../../components/ui/TagBadge';

export const BuscaPorTagPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const tag = tags.find(t => t.slug === slug);
  const noticiasTag = noticias.filter(n => n.publicada && tag && n.tags.includes(tag.id));
  const outrasT = tags.filter(t => t.slug !== slug);
  const getAutor = (id: number) => usuarios.find(u => u.id === id)?.nome || 'Desconhecido';
  const getTags = (ids: number[]) => tags.filter(t => ids.includes(t.id));

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {tag && <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary)', color: '#fff', fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem' }}>{tag.nome}</div>}
      <h2 style={{ marginBottom: '1.5rem' }}>{noticiasTag.length} notícias sobre "{tag?.nome || slug}"</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {noticiasTag.map(n => (
          <Card key={n.id} onClick={() => navigate(`/noticia/${n.id}`)}>
            <div style={{ height: '180px', backgroundImage: `url(${n.imagemCapa})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>{getTags(n.tags).map(t => <TagBadge key={t.id} tag={t} />)}</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{n.titulo}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{n.subtitulo}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getAutor(n.autorId)} • {new Date(n.criadoEm).toLocaleDateString('pt-BR')}</p>
            </div>
          </Card>
        ))}
      </div>
      <section>
        <h3 style={{ marginBottom: '1rem' }}>Tags Relacionadas</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {outrasT.map(t => <TagBadge key={t.id} tag={t} />)}
        </div>
      </section>
    </div>
  );
};
