import { useState } from 'react';
import { Link } from 'react-router';
import { comentarios } from '../../data/comentarios';
import { usuarios } from '../../data/usuarios';
import { noticias } from '../../data/noticias';
import { Card } from '../../components/ui/Card';

export const GerenciarComentariosPage = () => {
  const [filtro, setFiltro] = useState('');
  const [busca, setBusca] = useState('');
  const [selecionados, setSelecionados] = useState<number[]>([]);

  const filtrados = comentarios.filter(c => {
    if (busca && !c.texto.toLowerCase().includes(busca.toLowerCase())) return false;
    if (filtro === 'aprovados' && !c.aprovado) return false;
    if (filtro === 'pendentes' && c.aprovado) return false;
    return true;
  });

  const toggleSel = (id: number) => selecionados.includes(id) ? setSelecionados(selecionados.filter(s => s !== id)) : setSelecionados([...selecionados, id]);

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Gerenciar Comentários</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input className="input-field" placeholder="Buscar..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex: 1, minWidth: '200px' }} />
        <select className="input-field" value={filtro} onChange={e => setFiltro(e.target.value)} style={{ width: '180px' }}><option value="">Todos</option><option value="aprovados">Aprovados</option><option value="pendentes">Pendentes</option></select>
      </div>
      {selecionados.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontWeight: 600 }}>{selecionados.length} selecionados</span>
          <button onClick={() => { alert('Aprovados!'); setSelecionados([]); }} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-success)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Aprovar Selecionados</button>
          <button onClick={() => { alert('Excluídos!'); setSelecionados([]); }} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Excluir Selecionados</button>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtrados.map(c => {
          const autor = usuarios.find(u => u.id === c.autorId);
          const noticia = noticias.find(n => n.id === c.noticiaId);
          return (
            <Card key={c.id} style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <input type="checkbox" checked={selecionados.includes(c.id)} onChange={() => toggleSel(c.id)} style={{ marginTop: '0.25rem' }} />
              <img src={autor?.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong>{autor?.nome}</strong>
                  <span style={{ padding: '0.125rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: c.aprovado ? '#d4edda' : '#fff3cd', color: c.aprovado ? '#155724' : '#856404' }}>{c.aprovado ? 'Aprovado' : 'Pendente'}</span>
                </div>
                <p style={{ marginBottom: '0.5rem' }}>{c.texto}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Em <Link to={`/noticia/${noticia?.id}`} style={{ color: 'var(--color-primary)' }}>{noticia?.titulo?.substring(0, 40)}...</Link> • {new Date(c.criadoEm).toLocaleDateString('pt-BR')}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {!c.aprovado && <button onClick={() => alert('Aprovado!')} style={{ padding: '0.25rem 0.5rem', background: 'var(--color-success)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Aprovar</button>}
                    {c.aprovado && <button onClick={() => alert('Rejeitado!')} style={{ padding: '0.25rem 0.5rem', background: 'var(--color-warning)', color: '#333', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Rejeitar</button>}
                    <button onClick={() => alert('Excluído!')} style={{ padding: '0.25rem 0.5rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Excluir</button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
