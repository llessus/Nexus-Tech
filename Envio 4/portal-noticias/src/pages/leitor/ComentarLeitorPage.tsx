import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const ComentarLeitorPage = () => {
  const { noticiaId } = useParams<{ noticiaId: string }>();
  const noticia = noticias.find(n => n.id === Number(noticiaId));
  const autor = noticia ? usuarios.find(u => u.id === noticia.autorId) : null;
  const [texto, setTexto] = useState('');
  const [enviado, setEnviado] = useState(false);

  if (!noticia) return <div className="container"><h2>Notícia não encontrada.</h2></div>;

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 0' }}>
      <Card style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <img src={noticia.imagemCapa} alt="" style={{ width: '100px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
        <div>
          <h3 style={{ fontSize: '1rem' }}>{noticia.titulo}</h3>
          <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>Por {autor?.nome}</p>
        </div>
      </Card>

      {!enviado ? (
        <Card style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Seu Comentário</h3>
          <textarea className="input-field" rows={6} maxLength={500} placeholder="Escreva seu comentário..." value={texto} onChange={e => setTexto(e.target.value)} style={{ width: '100%', resize: 'vertical', marginBottom: '0.5rem' }} />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'right' }}>{texto.length}/500 caracteres</p>
          <Button onClick={() => setEnviado(true)} disabled={!texto.trim()}>Enviar Comentário</Button>
        </Card>
      ) : (
        <Card style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-success)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>✓ Comentário enviado com sucesso!</p>
          <Link to={`/noticia/${noticiaId}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Voltar para a Notícia</Link>
        </Card>
      )}
    </div>
  );
};
