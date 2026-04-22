import { useParams, useNavigate } from 'react-router';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';
import { tags } from '../../data/tags';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { TagBadge } from '../../components/ui/TagBadge';

export const PublicarDespublicarPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noticia = noticias.find(n => n.id === Number(id));
  if (!noticia) return <div><h2>Notícia não encontrada</h2></div>;
  const autor = usuarios.find(u => u.id === noticia.autorId);
  const noticiaTags = tags.filter(t => noticia.tags.includes(t.id));

  return (
    <div style={{ maxWidth: '800px' }}>
      <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.813rem', fontWeight: 700, backgroundColor: noticia.publicada ? '#d4edda' : '#fff3cd', color: noticia.publicada ? '#155724' : '#856404' }}>{noticia.publicada ? 'Publicada' : 'Rascunho'}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(noticia.criadoEm).toLocaleDateString('pt-BR')}</span>
          </div>
          <span style={{ fontSize: '0.875rem' }}>Autor: <strong>{autor?.nome}</strong></span>
        </div>
        <Button variant={noticia.publicada ? 'danger' : 'primary'} onClick={() => { alert(noticia.publicada ? 'Despublicada!' : 'Publicada!'); navigate('/editor/painel'); }}>
          {noticia.publicada ? 'Despublicar Notícia' : 'Publicar Notícia'}
        </Button>
      </Card>

      <Card style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>{noticiaTags.map(t => <TagBadge key={t.id} tag={t} />)}</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{noticia.titulo}</h1>
        <h2 style={{ fontSize: '1.125rem', color: 'var(--text-muted)', fontWeight: 400, marginBottom: '1.5rem' }}>{noticia.subtitulo}</h2>
        <img src={noticia.imagemCapa} alt="" style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }} />
        <div style={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>{noticia.conteudo}</div>
      </Card>
    </div>
  );
};
