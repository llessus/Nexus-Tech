import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';

export const FormNoticiaAdminPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noticia = noticias.find(n => n.id === Number(id));
  const autor = noticia ? usuarios.find(u => u.id === noticia.autorId) : null;
  const [titulo, setTitulo] = useState(noticia?.titulo || '');
  const [subtitulo, setSubtitulo] = useState(noticia?.subtitulo || '');
  const [conteudo, setConteudo] = useState(noticia?.conteudo || '');
  const autores = usuarios.filter(u => u.perfil === 'AUTOR');

  if (!noticia) return <div><h2>Notícia não encontrada</h2></div>;

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ backgroundColor: '#fff3cd', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', fontWeight: 600, color: '#856404' }}>⚠️ Editando notícia de {autor?.nome}</div>
      <h2 style={{ marginBottom: '2rem' }}>Editar Notícia (Admin)</h2>
      <InputField label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <InputField label="Subtítulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
      <div className="input-group"><label className="input-label">Reatribuir Autor</label><select className="input-field" defaultValue={noticia.autorId}>{autores.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}</select></div>
      <div className="input-group"><label className="input-label">Conteúdo</label><textarea className="input-field" rows={10} value={conteudo} onChange={e => setConteudo(e.target.value)} style={{ resize: 'vertical' }} /></div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => { alert('Salvo!'); navigate('/admin/noticias'); }}>Salvar</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/noticias')}>Cancelar</Button>
      </div>
    </div>
  );
};
