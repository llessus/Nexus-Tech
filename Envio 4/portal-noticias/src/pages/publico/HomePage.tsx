import { useState } from 'react';
import { useNavigate } from 'react-router';
import { noticias } from '../../data/noticias';
import { tags } from '../../data/tags';
import { ufs } from '../../data/ufs';
import { usuarios } from '../../data/usuarios';
import { Card } from '../../components/ui/Card';
import { TagBadge } from '../../components/ui/TagBadge';

export const HomePage = () => {
  const navigate = useNavigate();
  const publicadas = noticias.filter(n => n.publicada);
  const destaque = publicadas[4] || publicadas[0];
  const recentes = publicadas.filter(n => n.id !== destaque.id).slice(0, 6);
  const [busca, setBusca] = useState('');
  const [ufFiltro, setUfFiltro] = useState('');

  const getAutorNome = (id: number) => usuarios.find(u => u.id === id)?.nome || 'Desconhecido';
  const getTags = (tagIds: number[]) => tags.filter(t => tagIds.includes(t.id));

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* SearchBar + UFSelector */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.125rem' }}>🔍</span>
          <input className="input-field" placeholder="Buscar notícias..." value={busca} onChange={e => setBusca(e.target.value)} style={{ paddingLeft: '2.75rem', width: '100%' }} />
        </div>
        <select className="input-field" value={ufFiltro} onChange={e => { setUfFiltro(e.target.value); if (e.target.value) navigate(`/busca/uf/${e.target.value}`); }} style={{ width: '200px' }}>
          <option value="">Filtrar por UF</option>
          {ufs.map(u => <option key={u.id} value={u.sigla}>{u.sigla} - {u.nome}</option>)}
        </select>
      </div>

      {/* Hero — notícia de destaque */}
      {destaque && (
        <section className="hero-section" onClick={() => navigate(`/noticia/${destaque.id}`)} style={{
          cursor: 'pointer', position: 'relative', borderRadius: 'var(--radius-lg)',
          overflow: 'hidden', height: '400px', display: 'flex', alignItems: 'flex-end', padding: '2rem'
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${destaque.imagemCapa})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.5)', transition: 'filter 0.3s' }} />
          <div style={{ position: 'relative', color: '#fff', zIndex: 1, maxWidth: '800px' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {getTags(destaque.tags).map(tag => <TagBadge key={tag.id} tag={tag} />)}
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{destaque.titulo}</h1>
            <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>{destaque.subtitulo}</p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', opacity: 0.7, marginTop: '1rem', alignItems: 'center' }}>
              <span>Por {getAutorNome(destaque.autorId)}</span>
              <span>•</span>
              <span>{new Date(destaque.criadoEm).toLocaleDateString('pt-BR')}</span>
              <span style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 'var(--radius-full)', fontSize: '0.813rem' }}>Ler mais →</span>
            </div>
          </div>
        </section>
      )}

      {/* Grid de Notícias */}
      <section>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '4px', height: '24px', backgroundColor: 'var(--color-primary)', borderRadius: '2px' }} />
          Últimas Notícias
        </h2>
        <div className="noticias-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {recentes.map(noticia => (
            <Card key={noticia.id} onClick={() => navigate(`/noticia/${noticia.id}`)}>
              <div style={{ height: '200px', backgroundImage: `url(${noticia.imagemCapa})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {getTags(noticia.tags).map(tag => <TagBadge key={tag.id} tag={tag} />)}
                </div>
                <h3 style={{ fontSize: '1.125rem' }}>{noticia.titulo}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {noticia.subtitulo}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem' }}>
                  <span>{getAutorNome(noticia.autorId)}</span>
                  <span>{new Date(noticia.criadoEm).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
