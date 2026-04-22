import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usuarios } from '../../data/usuarios';
import { cidades } from '../../data/cidades';
import { ufs } from '../../data/ufs';
import { Card } from '../../components/ui/Card';

export const CrudUsuariosPage = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [perfilF, setPerfilF] = useState('');
  const [statusF, setStatusF] = useState('');
  const [ufF, setUfF] = useState('');

  const filtrados = usuarios.filter(u => {
    if (busca && !u.nome.toLowerCase().includes(busca.toLowerCase()) && !u.email.toLowerCase().includes(busca.toLowerCase())) return false;
    if (perfilF && u.perfil !== perfilF) return false;
    if (statusF === 'ativo' && !u.ativo) return false;
    if (statusF === 'inativo' && u.ativo) return false;
    if (ufF && u.cidadeId) {
      const cidade = cidades.find(c => c.id === u.cidadeId);
      if (!cidade || cidade.ufId !== Number(ufF)) return false;
    }
    return true;
  });

  const getCidadeUF = (cidadeId?: number) => {
    if (!cidadeId) return '—';
    const cidade = cidades.find(c => c.id === cidadeId);
    const uf = cidade ? ufs.find(u => u.id === cidade.ufId) : null;
    return cidade ? `${cidade.nome}/${uf?.sigla}` : '—';
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Usuários</h2>

      {/* Filtros: SearchBar, Select Perfil, Select Status, Select UF */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input className="input-field" placeholder="Buscar nome ou e-mail..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex: 1, minWidth: '200px' }} />
        <select className="input-field" value={perfilF} onChange={e => setPerfilF(e.target.value)} style={{ width: '150px' }}>
          <option value="">Todos Perfis</option>
          <option value="LEITOR">Leitor</option>
          <option value="AUTOR">Autor</option>
          <option value="EDITOR">Editor</option>
          <option value="SUPERADMIN">SuperAdmin</option>
        </select>
        <select className="input-field" value={statusF} onChange={e => setStatusF(e.target.value)} style={{ width: '130px' }}>
          <option value="">Todos Status</option>
          <option value="ativo">Ativos</option>
          <option value="inativo">Inativos</option>
        </select>
        <select className="input-field" value={ufF} onChange={e => setUfF(e.target.value)} style={{ width: '120px' }}>
          <option value="">Todas UFs</option>
          {ufs.map(u => <option key={u.id} value={u.id}>{u.sigla}</option>)}
        </select>
      </div>

      {/* Tabela: Avatar, Nome, E-mail, Perfil, Cidade/UF, Status, Data, Ações */}
      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}></th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Nome</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>E-mail</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Perfil</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Cidade/UF</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Data</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ações</th>
          </tr></thead>
          <tbody>{filtrados.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 1rem' }}><img src={u.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%' }} /></td>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{u.nome}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{u.email}</td>
              <td style={{ padding: '0.75rem 1rem' }}><span style={{ fontSize: '0.7rem', fontWeight: 700 }}>{u.perfil}</span></td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.813rem' }}>{getCidadeUF(u.cidadeId)}</td>
              <td style={{ padding: '0.75rem 1rem' }}><span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: u.ativo ? '#d4edda' : '#f8d7da', color: u.ativo ? '#155724' : '#721c24' }}>{u.ativo ? 'Ativo' : 'Inativo'}</span></td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.813rem' }}>{new Date(u.criadoEm).toLocaleDateString('pt-BR')}</td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  <button onClick={() => navigate(`/admin/usuarios/${u.id}/editar`)} style={{ padding: '0.25rem 0.5rem', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => alert(u.ativo ? 'Desativado!' : 'Ativado!')} style={{ padding: '0.25rem 0.5rem', background: u.ativo ? '#6c757d' : 'var(--color-success)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>{u.ativo ? 'Desativar' : 'Ativar'}</button>
                  <button onClick={() => alert('Excluído!')} style={{ padding: '0.25rem 0.5rem', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
};
