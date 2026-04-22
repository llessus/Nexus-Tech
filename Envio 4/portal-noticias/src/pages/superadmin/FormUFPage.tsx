import { useParams, useNavigate } from 'react-router';
import { ufs } from '../../data/ufs';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';

export const FormUFPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const uf = id ? ufs.find(u => u.id === Number(id)) : null;
  const titulo = uf ? `Editar UF — ${uf.sigla}` : 'Nova UF';

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '2rem' }}>{titulo}</h2>
      <InputField label="Sigla" defaultValue={uf?.sigla || ''} placeholder="Ex: SP" maxLength={2} />
      <InputField label="Nome" defaultValue={uf?.nome || ''} placeholder="Ex: São Paulo" />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Button onClick={() => { alert('Salvo!'); navigate('/admin/ufs'); }}>Salvar</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/ufs')}>Cancelar</Button>
      </div>
    </div>
  );
};
