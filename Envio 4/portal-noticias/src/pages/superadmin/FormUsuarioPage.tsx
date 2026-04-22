import { useParams, useNavigate } from 'react-router';
import { usuarios } from '../../data/usuarios';
import { ufs } from '../../data/ufs';
import { cidades } from '../../data/cidades';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';

export const FormUsuarioPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = usuarios.find(u => u.id === Number(id));
  if (!user) return <div><h2>Usuário não encontrado</h2></div>;

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '2rem' }}>Editar Usuário — {user.nome}</h2>
      <InputField label="Nome" defaultValue={user.nome} />
      <InputField label="E-mail" defaultValue={user.email} readOnly style={{ backgroundColor: '#f0f0f0' }} />
      <div className="input-group"><label className="input-label">Perfil</label><select className="input-field" defaultValue={user.perfil}><option value="LEITOR">Leitor</option><option value="AUTOR">Autor</option><option value="EDITOR">Editor</option><option value="SUPERADMIN">SuperAdmin</option></select></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group"><label className="input-label">UF</label><select className="input-field"><option value="">Selecione</option>{ufs.map(u => <option key={u.id} value={u.id}>{u.sigla}</option>)}</select></div>
        <div className="input-group"><label className="input-label">Cidade</label><select className="input-field"><option value="">Selecione</option>{cidades.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></div>
      </div>
      <div className="input-group"><label className="input-label">Bio</label><textarea className="input-field" rows={3} defaultValue={user.bio} style={{ resize: 'vertical' }} /></div>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}><input type="checkbox" defaultChecked={user.ativo} /> Ativo</label>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => { alert('Salvo!'); navigate('/admin/usuarios'); }}>Salvar</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/usuarios')}>Cancelar</Button>
      </div>
    </div>
  );
};
