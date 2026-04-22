import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Sidebar } from './components/layout/Sidebar';

import { HomePage } from './pages/publico/HomePage';
import { LoginPage } from './pages/publico/LoginPage';
import { CadastroPage } from './pages/publico/CadastroPage';
import { LembrarSenhaPage } from './pages/publico/LembrarSenhaPage';
import { BuscaPorUFPage } from './pages/publico/BuscaPorUFPage';
import { BuscaPorTagPage } from './pages/publico/BuscaPorTagPage';
import { DetalheNoticiaPage } from './pages/publico/DetalheNoticiaPage';
import { NotFoundPage } from './pages/publico/NotFoundPage';

import { PerfilLeitorPage } from './pages/leitor/PerfilLeitorPage';
import { ComentarLeitorPage } from './pages/leitor/ComentarLeitorPage';

import { PerfilAutorPage } from './pages/autor/PerfilAutorPage';
import { MinhasNoticiasPage } from './pages/autor/MinhasNoticiasPage';
import { NovaNoticiaPage } from './pages/autor/NovaNoticiaPage';
import { EditarNoticiaPage } from './pages/autor/EditarNoticiaPage';
import { ComentarAutorPage } from './pages/autor/ComentarAutorPage';

import { PainelEditorPage } from './pages/editor/PainelEditorPage';
import { PerfilEditorPage } from './pages/editor/PerfilEditorPage';
import { PublicarDespublicarPage } from './pages/editor/PublicarDespublicarPage';
import { EditarQualquerNoticiaPage } from './pages/editor/EditarQualquerNoticiaPage';

import { DashboardPage } from './pages/superadmin/DashboardPage';
import { CrudUFPage } from './pages/superadmin/CrudUFPage';
import { FormUFPage } from './pages/superadmin/FormUFPage';
import { CrudCidadesPage } from './pages/superadmin/CrudCidadesPage';
import { FormCidadePage } from './pages/superadmin/FormCidadePage';
import { CrudTagsPage } from './pages/superadmin/CrudTagsPage';
import { FormTagPage } from './pages/superadmin/FormTagPage';
import { CrudPerfisPage } from './pages/superadmin/CrudPerfisPage';
import { CrudNoticiasPage } from './pages/superadmin/CrudNoticiasPage';
import { FormNoticiaAdminPage } from './pages/superadmin/FormNoticiaAdminPage';
import { CrudUsuariosPage } from './pages/superadmin/CrudUsuariosPage';
import { FormUsuarioPage } from './pages/superadmin/FormUsuarioPage';
import { GerenciarComentariosPage } from './pages/superadmin/GerenciarComentariosPage';

const superAdminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/ufs', label: 'UFs' },
  { href: '/admin/cidades', label: 'Cidades' },
  { href: '/admin/tags', label: 'Tags' },
  { href: '/admin/perfis', label: 'Perfis' },
  { href: '/admin/noticias', label: 'Notícias' },
  { href: '/admin/usuarios', label: 'Usuários' },
  { href: '/admin/comentarios', label: 'Comentários' }
];

const autorLinks = [
  { href: '/autor/perfil', label: 'Meu Perfil' },
  { href: '/autor/noticias', label: 'Minhas Notícias' }
];

const editorLinks = [
  { href: '/editor/painel', label: 'Painel' },
  { href: '/editor/perfil', label: 'Meu Perfil' }
];

function MainLayout() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="dashboard-grid">
        <Sidebar links={superAdminLinks} />
        <main style={{ padding: '2rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AutorLayout() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="dashboard-grid">
        <Sidebar links={autorLinks} />
        <main style={{ padding: '2rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function EditorLayout() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="dashboard-grid">
        <Sidebar links={editorLinks} />
        <main style={{ padding: '2rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÚBLICO */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/lembrar-senha" element={<LembrarSenhaPage />} />
          <Route path="/busca/uf/:sigla" element={<BuscaPorUFPage />} />
          <Route path="/busca/tag/:slug" element={<BuscaPorTagPage />} />
          <Route path="/noticia/:id" element={<DetalheNoticiaPage />} />
          <Route path="/leitor/perfil" element={<PerfilLeitorPage />} />
          <Route path="/leitor/comentar/:noticiaId" element={<ComentarLeitorPage />} />
          <Route path="/autor/comentar/:noticiaId" element={<ComentarAutorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* AUTOR */}
        <Route element={<AutorLayout />}>
          <Route path="/autor/perfil" element={<PerfilAutorPage />} />
          <Route path="/autor/noticias" element={<MinhasNoticiasPage />} />
          <Route path="/autor/noticias/nova" element={<NovaNoticiaPage />} />
          <Route path="/autor/noticias/:id/editar" element={<EditarNoticiaPage />} />
        </Route>

        {/* EDITOR */}
        <Route element={<EditorLayout />}>
          <Route path="/editor/painel" element={<PainelEditorPage />} />
          <Route path="/editor/perfil" element={<PerfilEditorPage />} />
          <Route path="/editor/publicar/:id" element={<PublicarDespublicarPage />} />
          <Route path="/editor/noticias/:id/editar" element={<EditarQualquerNoticiaPage />} />
        </Route>

        {/* SUPERADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/ufs" element={<CrudUFPage />} />
          <Route path="/admin/ufs/nova" element={<FormUFPage />} />
          <Route path="/admin/ufs/:id/editar" element={<FormUFPage />} />
          <Route path="/admin/cidades" element={<CrudCidadesPage />} />
          <Route path="/admin/cidades/nova" element={<FormCidadePage />} />
          <Route path="/admin/cidades/:id/editar" element={<FormCidadePage />} />
          <Route path="/admin/tags" element={<CrudTagsPage />} />
          <Route path="/admin/tags/nova" element={<FormTagPage />} />
          <Route path="/admin/tags/:id/editar" element={<FormTagPage />} />
          <Route path="/admin/perfis" element={<CrudPerfisPage />} />
          <Route path="/admin/noticias" element={<CrudNoticiasPage />} />
          <Route path="/admin/noticias/:id/editar" element={<FormNoticiaAdminPage />} />
          <Route path="/admin/usuarios" element={<CrudUsuariosPage />} />
          <Route path="/admin/usuarios/:id/editar" element={<FormUsuarioPage />} />
          <Route path="/admin/comentarios" element={<GerenciarComentariosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
