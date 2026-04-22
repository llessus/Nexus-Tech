import { Link } from 'react-router';
import { Card } from '../../components/ui/Card';
import { noticias } from '../../data/noticias';
import { usuarios } from '../../data/usuarios';
import { comentarios } from '../../data/comentarios';
import { tags as allTags } from '../../data/tags';
import { ufs } from '../../data/ufs';

export const DashboardPage = () => {
  const numUsuarios = usuarios.length;
  const numPublicadas = noticias.filter(n => n.publicada).length;
  const numRascunhos = noticias.filter(n => !n.publicada).length;
  const numComentarios = comentarios.length;
  const numUFs = ufs.length;
  const numTags = allTags.length;

  const comentariosPendentes = comentarios.filter(c => !c.aprovado);

  // Gráfico CSS — notícias por tag (barras horizontais)
  const noticiasPorTag = allTags.map(tag => ({
    tag: tag.nome,
    count: noticias.filter(n => n.tags.includes(tag.id)).length
  })).sort((a, b) => b.count - a.count).slice(0, 6);
  const maxCountTag = Math.max(...noticiasPorTag.map(t => t.count), 1);

  // Gráfico CSS — notícias por mês (6 barras verticais)
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const noticiasPorMes = meses.map((m, i) => ({
    mes: m,
    count: noticias.filter(n => new Date(n.criadoEm).getMonth() === i).length
  }));
  const maxCountMes = Math.max(...noticiasPorMes.map(m => m.count), 1);

  // Últimas 5 notícias
  const ultimasNoticias = [...noticias].sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()).slice(0, 5);

  // Últimos 5 usuários
  const ultimosUsuarios = [...usuarios].sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()).slice(0, 5);

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Dashboard</h2>

      {/* 6 Cards de Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <Card style={{ padding: '1.25rem', borderLeft: '4px solid #3a86ff' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>👥 Usuários</p>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{numUsuarios}</p>
        </Card>
        <Card style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-success)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>📰 Publicadas</p>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{numPublicadas}</p>
        </Card>
        <Card style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-warning)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>📝 Rascunhos</p>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{numRascunhos}</p>
        </Card>
        <Card style={{ padding: '1.25rem', borderLeft: '4px solid #8338ec' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>💬 Comentários</p>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{numComentarios}</p>
        </Card>
        <Card style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-primary)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>🗺️ UFs</p>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{numUFs}</p>
        </Card>
        <Card style={{ padding: '1.25rem', borderLeft: '4px solid #e76f51' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>🏷️ Tags</p>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{numTags}</p>
        </Card>
      </div>

      {/* Dois gráficos lado a lado */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Gráfico de barras horizontais — notícias por tag */}
        <Card style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Notícias por Tag</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {noticiasPorTag.map(item => (
              <div key={item.tag} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '90px', fontSize: '0.813rem', fontWeight: 600, textAlign: 'right' }}>{item.tag}</span>
                <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '4px', height: '24px' }}>
                  <div style={{ width: `${(item.count / maxCountTag) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '6px', transition: 'width 0.6s ease' }}>
                    <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Gráfico de barras verticais — notícias por mês */}
        <Card style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Notícias por Mês</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '180px', paddingTop: '1rem' }}>
            {noticiasPorMes.map(item => (
              <div key={item.mes} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.count}</span>
                <div style={{ width: '100%', height: `${Math.max((item.count / maxCountMes) * 100, 5)}%`, background: 'linear-gradient(180deg, var(--color-primary), var(--color-accent))', borderRadius: '4px 4px 0 0', transition: 'height 0.6s ease' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 600 }}>{item.mes}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tabela "Notícias Pendentes" + "Comentários para Moderar" */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Notícias Pendentes */}
        <Card style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}><h3 style={{ fontSize: '1rem' }}>Notícias Pendentes</h3></div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Título</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Autor</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
            </tr></thead>
            <tbody>{noticias.filter(n => !n.publicada).slice(0, 5).map(n => (
              <tr key={n.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.titulo}</td>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.813rem' }}>{usuarios.find(u => u.id === n.autorId)?.nome}</td>
                <td style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.25rem' }}>
                  <button style={{ padding: '0.25rem 0.5rem', background: 'var(--color-success)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Publicar</button>
                  <button style={{ padding: '0.25rem 0.5rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Rejeitar</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </Card>

        {/* Comentários para Moderar */}
        <Card style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}><h3 style={{ fontSize: '1rem' }}>Comentários para Moderar</h3></div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {comentariosPendentes.map(c => {
              const autorC = usuarios.find(u => u.id === c.autorId);
              const noticiaC = noticias.find(n => n.id === c.noticiaId);
              return (
                <div key={c.id} style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #eee', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <img src={autorC?.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.813rem' }}><strong>{autorC?.nome}</strong>: {c.texto.substring(0, 60)}...</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Em {noticiaC?.titulo?.substring(0, 30)}...</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                    <button style={{ padding: '0.2rem 0.4rem', background: 'var(--color-success)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>✓</button>
                    <button style={{ padding: '0.2rem 0.4rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>✗</button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tabelas Últimos Usuários + Últimas Notícias */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Últimos Usuários */}
        <Card style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}><h3 style={{ fontSize: '1rem' }}>Últimos Usuários</h3></div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}></th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Nome</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>E-mail</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Perfil</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Data</th>
            </tr></thead>
            <tbody>{ultimosUsuarios.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem 1rem' }}><img src={u.avatar} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%' }} /></td>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.813rem', fontWeight: 500 }}>{u.nome}</td>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>{u.email}</td>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', fontWeight: 700 }}>{u.perfil}</td>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>{new Date(u.criadoEm).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}</tbody>
          </table>
        </Card>

        {/* Últimas Notícias */}
        <Card style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}><h3 style={{ fontSize: '1rem' }}>Últimas Notícias</h3></div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Título</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Autor</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Data</th>
            </tr></thead>
            <tbody>{ultimasNoticias.map(n => (
              <tr key={n.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.813rem', fontWeight: 500, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><Link to={`/noticia/${n.id}`} style={{ color: 'var(--color-primary)' }}>{n.titulo}</Link></td>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.813rem' }}>{usuarios.find(u => u.id === n.autorId)?.nome}</td>
                <td style={{ padding: '0.5rem 1rem' }}><span style={{ padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, backgroundColor: n.publicada ? '#d4edda' : '#fff3cd', color: n.publicada ? '#155724' : '#856404' }}>{n.publicada ? 'Pub' : 'Rasc'}</span></td>
                <td style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>{new Date(n.criadoEm).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
