# Portal de Notícias — Envio 4

Portal de notícias desenvolvido em **React + TypeScript + Vite** com 31 páginas navegáveis, dados mockados e design moderno.

## 🚀 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

O servidor de desenvolvimento inicia em `http://localhost:5173/`.

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/       # Header, Footer, Sidebar
│   └── ui/           # Button, Card, InputField, TagBadge
├── data/             # Dados mockados (30 notícias, 40 comentários, 15 usuários, etc.)
├── pages/
│   ├── publico/      # Home, Login, Cadastro, LembrarSenha, DetalheNotícia, BuscaPorUF/Tag, 404
│   ├── leitor/       # Perfil, Comentar
│   ├── autor/        # Perfil, MinhasNotícias, Nova/Editar, Comentar
│   ├── editor/       # Painel, Perfil, Publicar/Despublicar, EditarQualquer
│   └── superadmin/   # Dashboard, CRUDs (UFs, Cidades, Tags, Perfis, Notícias, Usuários, Comentários)
├── types/            # Interfaces TypeScript
├── App.tsx           # Router com 31 rotas e 4 layouts
└── index.css         # Design system com variáveis CSS
```

## 📊 Dados Mockados

| Arquivo | Quantidade | Detalhes |
|---------|-----------|----------|
| `noticias.ts` | 30 | 20 publicadas + 10 rascunhos |
| `comentarios.ts` | 40 | 25 aprovados + 15 pendentes |
| `usuarios.ts` | 15 | 5 Leitor, 5 Autor, 3 Editor, 2 SuperAdmin |
| `ufs.ts` | 27 | Todos os estados + DF |
| `cidades.ts` | 30 | Distribuídas em 15 UFs |
| `tags.ts` | 10 | Política, Esportes, Tecnologia, etc. |

## 🔗 Acesso Rápido (Desenvolvimento)

Na tela de Login (`/login`), use os botões de **Acesso Rápido** para navegar entre os perfis:

- **LEITOR** → `/leitor/perfil`
- **AUTOR** → `/autor/noticias`
- **EDITOR** → `/editor/painel`
- **SUPERADMIN** → `/admin/dashboard`

## 🛠️ Tecnologias

- React 19
- TypeScript
- Vite 8
- React Router v7
- CSS Puro (sem frameworks de UI)
