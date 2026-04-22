import { useState } from 'react';
import { Link } from 'react-router';
import { usuarios } from '../../data/usuarios';
import { noticias } from '../../data/noticias';
import { comentarios } from '../../data/comentarios';
import { cidades } from '../../data/cidades';
import { ufs } from '../../data/ufs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const PerfilAutorPage = () => {
  const user = usuarios[5]; // Ana Silva - AUTOR
  const [editando, setEditando] = useState(false);
  const cidade = cidades.find(c => c.id === user.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);
  const minhasNoticias = noticias.filter(n => n.autorId === user.id);
  const publicadas = minhasNoticias.filter(n => n.publicada);
  const rascunhos = minhasNoticias.filter(n => !n.publicada);
  const totalVis = minhasNoticias.reduce((a, n) => a + n.visualizacoes, 0);
  const totalComentarios = comentarios.filter(c => minhasNoticias.some(n => n.id === c.noticiaId)).length;

  return (
    <div>
      <Card style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
          <img src={user.avatar} alt={user.nome} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <h2>{user.nome}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{user.email}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{cidade?.nome}, {uf?.sigla}</p>
            <p style={{ marginTop: '0.5rem' }}>{user.bio}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Cadastro: {new Date(user.criadoEm).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        {!editando ? <Button onClick={() => setEditando(true)}>Editar Perfil</Button> : <div style={{ display: 'flex', gap: '1rem' }}><Button onClick={() => setEditando(false)}>Salvar</Button><Button variant="ghost" onClick={() => setEditando(false)}>Cancelar</Button></div>}
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <Card style={{ padding: '1.25rem', textAlign: 'center' }}><p style={{ fontSize: '2rem', fontWeight: 800 }}>{minhasNoticias.length}</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total</p></Card>
        <Card style={{ padding: '1.25rem', textAlign: 'center' }}><p style={{ fontSize: '2rem', fontWeight: 800 }}>{publicadas.length}</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Publicadas</p></Card>
        <Card style={{ padding: '1.25rem', textAlign: 'center' }}><p style={{ fontSize: '2rem', fontWeight: 800 }}>{rascunhos.length}</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rascunhos</p></Card>
        <Card style={{ padding: '1.25rem', textAlign: 'center' }}><p style={{ fontSize: '2rem', fontWeight: 800 }}>{totalVis.toLocaleString()}</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Visualizações</p></Card>
        <Card style={{ padding: '1.25rem', textAlign: 'center' }}><p style={{ fontSize: '2rem', fontWeight: 800 }}>{totalComentarios}</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Comentários</p></Card>
      </div>

      <Card style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Meus Comentários</h3>
        {comentarios.filter(c => c.autorId === user.id && c.aprovado).map(c => {
          const noticia = noticias.find(n => n.id === c.noticiaId);
          return (<div key={c.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}><p>"{c.texto}"</p><p style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>Em <Link to={`/noticia/${noticia?.id}`} style={{ color: 'var(--color-primary)' }}>{noticia?.titulo}</Link> • {new Date(c.criadoEm).toLocaleDateString('pt-BR')}</p></div>);
        })}
      </Card>
    </div>
  );
};
