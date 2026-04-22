import { useState } from 'react';
import { usuarios } from '../../data/usuarios';
import { cidades } from '../../data/cidades';
import { ufs } from '../../data/ufs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const PerfilEditorPage = () => {
  const user = usuarios[2]; // Carlos Editor
  const [editando, setEditando] = useState(false);
  const cidade = cidades.find(c => c.id === user.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);

  return (
    <div>
      <Card style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
          <img src={user.avatar} alt={user.nome} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <h2>{user.nome}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{user.email}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{cidade?.nome}, {uf?.sigla}</p>
            <p style={{ marginTop: '0.5rem' }}>{user.bio}</p>
          </div>
        </div>
        {!editando ? <Button onClick={() => setEditando(true)}>Editar Perfil</Button> : <div style={{ display: 'flex', gap: '1rem' }}><Button onClick={() => setEditando(false)}>Salvar</Button><Button variant="ghost" onClick={() => setEditando(false)}>Cancelar</Button></div>}
      </Card>
    </div>
  );
};
