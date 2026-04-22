import { useState } from 'react';
import { InputField } from '../../components/ui/InputField';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { tags } from '../../data/tags';
import { ufs } from '../../data/ufs';
import { cidades } from '../../data/cidades';

export const NovaNoticiaPage = () => {
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [ufId, setUfId] = useState('');
  const [tagsSel, setTagsSel] = useState<number[]>([]);

  const cidadesFiltradas = cidades.filter(c => c.ufId === Number(ufId));

  const toggleTag = (id: number) => {
    if (tagsSel.includes(id)) setTagsSel(tagsSel.filter(t => t !== id));
    else if (tagsSel.length < 5) setTagsSel([...tagsSel, id]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
      <div>
        <h2 style={{ marginBottom: '2rem' }}>Nova Notícia</h2>
        <InputField label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título da notícia" />
        <InputField label="Subtítulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} placeholder="Subtítulo" />
        <InputField label="URL da Imagem de Capa" value={imagemUrl} onChange={e => setImagemUrl(e.target.value)} placeholder="https://..." />
        {imagemUrl && <img src={imagemUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }} />}
        <div className="input-group"><label className="input-label">Conteúdo</label><textarea className="input-field" rows={15} value={conteudo} onChange={e => setConteudo(e.target.value)} placeholder="Escreva o corpo da notícia..." style={{ resize: 'vertical' }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group"><label className="input-label">UF</label><select className="input-field" value={ufId} onChange={e => setUfId(e.target.value)}><option value="">Selecione</option>{ufs.map(u => <option key={u.id} value={u.id}>{u.sigla}</option>)}</select></div>
          <div className="input-group"><label className="input-label">Cidade</label><select className="input-field" disabled={!ufId}><option value="">Selecione</option>{cidadesFiltradas.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></div>
        </div>
        <div className="input-group">
          <label className="input-label">Tags (máx 5)</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map(t => (<span key={t.id} onClick={() => toggleTag(t.id)} style={{ padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: '0.813rem', fontWeight: 600, backgroundColor: tagsSel.includes(t.id) ? 'var(--color-primary)' : '#e9ecef', color: tagsSel.includes(t.id) ? '#fff' : '#333' }}>{t.nome}</span>))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button variant="secondary" onClick={() => alert('Salvo como rascunho!')}>Salvar como Rascunho</Button>
          <Button onClick={() => alert('Enviado para revisão!')}>Enviar para Revisão</Button>
        </div>
      </div>

      <aside>
        <h3 style={{ marginBottom: '1rem' }}>Preview</h3>
        <Card>
          {imagemUrl && <div style={{ height: '150px', backgroundImage: `url(${imagemUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
          <div style={{ padding: '1.25rem' }}>
            <h4>{titulo || 'Título da Notícia'}</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{subtitulo || 'Subtítulo'}</p>
          </div>
        </Card>
      </aside>
    </div>
  );
};
