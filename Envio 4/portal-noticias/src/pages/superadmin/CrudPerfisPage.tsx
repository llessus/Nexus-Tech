import { usuarios } from '../../data/usuarios';
import { Card } from '../../components/ui/Card';
import type { Perfil } from '../../types';

const perfisInfo: { perfil: Perfil; cor: string; desc: string }[] = [
  { perfil: 'LEITOR', cor: '#3a86ff', desc: 'Pode ler notícias e enviar comentários.' },
  { perfil: 'AUTOR', cor: '#2a9d8f', desc: 'Pode criar, editar e enviar notícias para revisão.' },
  { perfil: 'EDITOR', cor: '#e9c46a', desc: 'Pode publicar/despublicar e editar qualquer notícia.' },
  { perfil: 'SUPERADMIN', cor: '#e63946', desc: 'Acesso total a todos os recursos do sistema.' },
];

export const CrudPerfisPage = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Perfis de Acesso</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {perfisInfo.map(p => (
          <Card key={p.perfil} style={{ padding: '2rem', borderTop: `4px solid ${p.cor}` }}>
            <h3 style={{ color: p.cor, marginBottom: '0.5rem' }}>{p.perfil}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{p.desc}</p>
            <p style={{ fontSize: '2rem', fontWeight: 800 }}>{usuarios.filter(u => u.perfil === p.perfil).length}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>usuários</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
