import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';
import { noticias } from '../../data/noticias';
import { tags } from '../../data/tags';

export const EditarNoticiaPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noticia = noticias.find(n => n.id === Number(id));
  const [titulo, setTitulo] = useState(noticia?.titulo || '');
  const [subtitulo, setSubtitulo] = useState(noticia?.subtitulo || '');
  const [conteudo, setConteudo] = useState(noticia?.conteudo || '');

  if (!noticia) return <div><h2>Notícia não encontrada</h2></div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: noticia.publicada ? '#d4edda' : '#fff3cd', color: noticia.publicada ? '#155724' : '#856404' }}>{noticia.publicada ? 'Publicada' : 'Rascunho'}</span>
        <h2>Editar Notícia</h2>
      </div>
      <InputField label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <InputField label="Subtítulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
      <div className="input-group"><label className="input-label">Conteúdo</label><textarea className="input-field" rows={12} value={conteudo} onChange={e => setConteudo(e.target.value)} style={{ resize: 'vertical' }} /></div>
      <div className="input-group"><label className="input-label">Tags</label><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{tags.filter(t => noticia.tags.includes(t.id)).map(t => (<span key={t.id} style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>{t.nome}</span>))}</div></div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Button onClick={() => alert('Alterações salvas!')}>Salvar Alterações</Button>
        <Button variant="ghost" onClick={() => navigate('/autor/noticias')}>Cancelar</Button>
      </div>
    </div>
  );
};
