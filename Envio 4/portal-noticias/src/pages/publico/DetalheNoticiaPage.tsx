import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';
import { tags } from '../../data/tags';
import { comentarios } from '../../data/comentarios';
import { cidades } from '../../data/cidades';
import { ufs } from '../../data/ufs';
import { TagBadge } from '../../components/ui/TagBadge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const DetalheNoticiaPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noticia = noticias.find(n => n.id === Number(id));
  const [comentarioTexto, setComentarioTexto] = useState('');

  if (!noticia) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Notícia não encontrada.</h2></div>;
  }

  const autor = usuarios.find(u => u.id === noticia.autorId);
  const noticiaTags = tags.filter(t => noticia.tags.includes(t.id));
  const comentariosAprovados = comentarios.filter(c => c.noticiaId === noticia.id && c.aprovado);
  const cidade = cidades.find(c => c.id === noticia.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);
  const noticiasDoAutor = noticias.filter(n => n.autorId === noticia.autorId && n.publicada);
  const noticiasRecentes = noticias.filter(n => n.publicada && n.id !== noticia.id).slice(0, 5);
  const tagsPopulares = tags.slice(0, 8);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '0.75rem 0', backgroundColor: '#fff', borderBottom: '1px solid #eee', marginBottom: '2rem' }}>
        <div className="container" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> &gt; {noticiaTags[0]?.nome || 'Notícia'} &gt; <span style={{ color: 'var(--text-main)' }}>{noticia.titulo}</span>
        </div>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem' }}>

        {/* Coluna Principal (70%) */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {noticiaTags.map(t => <TagBadge key={t.id} tag={t} />)}
          </div>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{noticia.titulo}</h1>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-muted)', fontWeight: 400, marginBottom: '2rem' }}>{noticia.subtitulo}</h2>

          {/* Metadados */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', marginBottom: '2rem' }}>
            <img src={autor?.avatar} alt={autor?.nome} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <p style={{ fontWeight: 600 }}>{autor?.nome}</p>
              <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                {new Date(noticia.criadoEm).toLocaleDateString('pt-BR')} • {noticia.visualizacoes.toLocaleString()} visualizações • {cidade?.nome}/{uf?.sigla}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {noticiaTags.map(t => <TagBadge key={t.id} tag={t} />)}
          </div>

          {/* Imagem de capa 16:9 */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2rem' }}>
            <img src={noticia.imagemCapa} alt={noticia.titulo} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Corpo da notícia */}
          <div style={{ fontSize: '1.125rem', lineHeight: 1.8, whiteSpace: 'pre-line', color: '#333', marginBottom: '3rem' }}>
            {noticia.conteudo}
          </div>

          {/* Seção de Comentários */}
          <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid #eee' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Comentários ({comentariosAprovados.length})</h3>

            {comentariosAprovados.map(c => {
              const autorC = usuarios.find(u => u.id === c.autorId);
              return (
                <div key={c.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={autorC?.avatar || 'https://i.pravatar.cc/150'} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <strong>{autorC?.nome}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(c.criadoEm).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <p style={{ color: '#444' }}>{c.texto}</p>
                  </div>
                </div>
              );
            })}

            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Deixe seu comentário</h4>
              <textarea rows={4} className="input-field" style={{ width: '100%', marginBottom: '1rem', resize: 'vertical' }} placeholder="O que você achou?" value={comentarioTexto} onChange={e => setComentarioTexto(e.target.value)} />
              <Button onClick={() => { alert('Comentário enviado!'); setComentarioTexto(''); }}>Enviar Comentário</Button>
            </div>
          </section>
        </div>

        {/* Sidebar (30%) */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Sobre o Autor */}
          <Card style={{ padding: '1.5rem', textAlign: 'center' }}>
            <img src={autor?.avatar} alt={autor?.nome} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }} />
            <h4>{autor?.nome}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{autor?.bio}</p>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>{noticiasDoAutor.length} notícias publicadas</p>
          </Card>

          {/* Notícias Recentes */}
          <Card style={{ padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Notícias Recentes</h4>
            {noticiasRecentes.map(n => (
              <div key={n.id} onClick={() => navigate(`/noticia/${n.id}`)} style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <img src={n.imagemCapa} alt="" style={{ width: '60px', height: '45px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.813rem', fontWeight: 600, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.titulo}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{new Date(n.criadoEm).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Tags Populares */}
          <Card style={{ padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Tags Populares</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tagsPopulares.map(t => <TagBadge key={t.id} tag={t} />)}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};
