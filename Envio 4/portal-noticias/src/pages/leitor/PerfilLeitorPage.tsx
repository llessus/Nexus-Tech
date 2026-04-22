import { useState } from 'react';
import { Link } from 'react-router';
import { usuarios } from '../../data/usuarios';
import { comentarios } from '../../data/comentarios';
import { noticias } from '../../data/noticias';
import { cidades } from '../../data/cidades';
import { ufs } from '../../data/ufs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const PerfilLeitorPage = () => {
  const user = usuarios[10]; // Lucas Martins - LEITOR
  const [editando, setEditando] = useState(false);
  const cidade = cidades.find(c => c.id === user.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);
  const meusComentarios = comentarios.filter(c => c.autorId === user.id && c.aprovado);

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <Card style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
          <img src={user.avatar} alt={user.nome} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <h2>{user.nome}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{user.email}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{cidade?.nome}, {uf?.sigla}</p>
            <p style={{ marginTop: '0.5rem' }}>{user.bio}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Cadastrado em {new Date(user.criadoEm).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        {!editando ? (
          <Button onClick={() => setEditando(true)}>Editar Perfil</Button>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={() => setEditando(false)}>Salvar</Button>
            <Button variant="ghost" onClick={() => setEditando(false)}>Cancelar</Button>
          </div>
        )}
      </Card>

      <Card style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Meus Comentários ({meusComentarios.length})</h3>
        {meusComentarios.map(c => {
          const noticia = noticias.find(n => n.id === c.noticiaId);
          return (
            <div key={c.id} style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}>
              <p style={{ marginBottom: '0.25rem' }}>"{c.texto}"</p>
              <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                Em <Link to={`/noticia/${noticia?.id}`} style={{ color: 'var(--color-primary)' }}>{noticia?.titulo}</Link> • {new Date(c.criadoEm).toLocaleDateString('pt-BR')}
              </p>
            </div>
          );
        })}
      </Card>
    </div>
  );
};
