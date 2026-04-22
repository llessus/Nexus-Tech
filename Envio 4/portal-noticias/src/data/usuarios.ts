import type { Usuario } from '../types';

export const usuarios: Usuario[] = [
  { id: 1, nome: 'Admin Master', email: 'admin@portal.com', perfil: 'SUPERADMIN', avatar: 'https://i.pravatar.cc/150?u=1', bio: 'Administrador central do sistema.', cidadeId: 1, ativo: true, criadoEm: '2023-01-01T10:00:00Z' },
  { id: 2, nome: 'Admin Secundário', email: 'admin2@portal.com', perfil: 'SUPERADMIN', avatar: 'https://i.pravatar.cc/150?u=2', bio: 'Administrador geral.', cidadeId: 26, ativo: true, criadoEm: '2023-02-15T09:30:00Z' },
  { id: 3, nome: 'Carlos Editor', email: 'editor1@portal.com', perfil: 'EDITOR', avatar: 'https://i.pravatar.cc/150?u=3', bio: 'Revisor sênior e editor de conteúdo.', cidadeId: 3, ativo: true, criadoEm: '2023-03-10T14:20:00Z' },
  { id: 4, nome: 'Mariana Lima', email: 'editor2@portal.com', perfil: 'EDITOR', avatar: 'https://i.pravatar.cc/150?u=4', bio: 'Editora de tecnologia e ciências.', cidadeId: 5, ativo: true, criadoEm: '2023-04-05T11:00:00Z' },
  { id: 5, nome: 'Roberto Gomes', email: 'editor3@portal.com', perfil: 'EDITOR', avatar: 'https://i.pravatar.cc/150?u=5', bio: 'Editor chefe de esportes.', cidadeId: 13, ativo: true, criadoEm: '2023-05-20T16:45:00Z' },
  { id: 6, nome: 'Ana Silva', email: 'autor1@portal.com', perfil: 'AUTOR', avatar: 'https://i.pravatar.cc/150?u=6', bio: 'Jornalista premiada na área de política.', cidadeId: 26, ativo: true, criadoEm: '2023-06-01T08:15:00Z' },
  { id: 7, nome: 'João Pedro', email: 'autor2@portal.com', perfil: 'AUTOR', avatar: 'https://i.pravatar.cc/150?u=7', bio: 'Especialista em análises esportivas.', cidadeId: 9, ativo: true, criadoEm: '2023-06-15T13:30:00Z' },
  { id: 8, nome: 'Fernanda Rocha', email: 'autor3@portal.com', perfil: 'AUTOR', avatar: 'https://i.pravatar.cc/150?u=8', bio: 'Escritora e crítica de cultura.', cidadeId: 1, ativo: true, criadoEm: '2023-07-22T09:00:00Z' },
  { id: 9, nome: 'Paulo Mendes', email: 'autor4@portal.com', perfil: 'AUTOR', avatar: 'https://i.pravatar.cc/150?u=9', bio: 'Analista de economia global.', cidadeId: 3, ativo: true, criadoEm: '2023-08-10T10:45:00Z' },
  { id: 10, nome: 'Camila Costa', email: 'autor5@portal.com', perfil: 'AUTOR', avatar: 'https://i.pravatar.cc/150?u=10', bio: 'Repórter focada em tecnologia.', cidadeId: 14, ativo: true, criadoEm: '2023-09-05T15:20:00Z' },
  { id: 11, nome: 'Lucas Martins', email: 'leitor1@portal.com', perfil: 'LEITOR', avatar: 'https://i.pravatar.cc/150?u=11', bio: 'Leitor assíduo.', cidadeId: 2, ativo: true, criadoEm: '2023-10-01T11:10:00Z' },
  { id: 12, nome: 'Juliana Castro', email: 'leitor2@portal.com', perfil: 'LEITOR', avatar: 'https://i.pravatar.cc/150?u=12', bio: 'Adoro tecnologia e ciência.', cidadeId: 6, ativo: true, criadoEm: '2023-10-15T14:30:00Z' },
  { id: 13, nome: 'Sergio Lima', email: 'leitor3@portal.com', perfil: 'LEITOR', avatar: 'https://i.pravatar.cc/150?u=13', bio: 'Comentarista esporádico.', cidadeId: 10, ativo: true, criadoEm: '2023-11-02T09:40:00Z' },
  { id: 14, nome: 'Renata Faria', email: 'leitor4@portal.com', perfil: 'LEITOR', avatar: 'https://i.pravatar.cc/150?u=14', bio: 'Acompanho política diariamente.', cidadeId: 26, ativo: true, criadoEm: '2023-11-20T16:15:00Z' },
  { id: 15, nome: 'Diego Alves', email: 'leitor5@portal.com', perfil: 'LEITOR', avatar: 'https://i.pravatar.cc/150?u=15', bio: 'Fanático por esportes.', cidadeId: 13, ativo: true, criadoEm: '2023-12-05T10:05:00Z' }
];
