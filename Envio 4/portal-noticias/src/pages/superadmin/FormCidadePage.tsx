import { useParams, useNavigate } from 'react-router';
import { cidades } from '../../data/cidades';
import { ufs } from '../../data/ufs';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';

export const FormCidadePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cidade = id ? cidades.find(c => c.id === Number(id)) : null;

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '2rem' }}>{cidade ? `Editar Cidade — ${cidade.nome}` : 'Nova Cidade'}</h2>
      <InputField label="Nome" defaultValue={cidade?.nome || ''} placeholder="Nome da cidade" />
      <div className="input-group"><label className="input-label">UF</label><select className="input-field" defaultValue={cidade?.ufId || ''}><option value="">Selecione</option>{ufs.map(u => <option key={u.id} value={u.id}>{u.sigla} - {u.nome}</option>)}</select></div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Button onClick={() => { alert('Salvo!'); navigate('/admin/cidades'); }}>Salvar</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/cidades')}>Cancelar</Button>
      </div>
    </div>
  );
};
