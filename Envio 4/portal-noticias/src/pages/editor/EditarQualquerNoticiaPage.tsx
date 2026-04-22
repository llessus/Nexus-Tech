import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';

export const EditarQualquerNoticiaPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noticia = noticias.find(n => n.id === Number(id));
  const autor = noticia ? usuarios.find(u => u.id === noticia.autorId) : null;
  const [titulo, setTitulo] = useState(noticia?.titulo || '');
  const [subtitulo, setSubtitulo] = useState(noticia?.subtitulo || '');
  const [conteudo, setConteudo] = useState(noticia?.conteudo || '');

  if (!noticia) return <div><h2>Notícia não encontrada</h2></div>;

  return (
    <div>
      <div style={{ backgroundColor: '#fff3cd', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', fontWeight: 600, color: '#856404' }}>
        ⚠️ Você está editando uma notícia de {autor?.nome}
      </div>
      <h2 style={{ marginBottom: '2rem' }}>Editar Notícia</h2>
      <InputField label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <InputField label="Subtítulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
      <div className="input-group"><label className="input-label">Conteúdo</label><textarea className="input-field" rows={12} value={conteudo} onChange={e => setConteudo(e.target.value)} style={{ resize: 'vertical' }} /></div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Button onClick={() => alert('Salvo!')}>Salvar Alterações</Button>
        <Button variant="ghost" onClick={() => navigate('/editor/painel')}>Cancelar</Button>
      </div>
    </div>
  );
};
