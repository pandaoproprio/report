import type { Permission, Role, User } from '@/types';

// ===== PERMISSÕES =====
export const mockPermissions: Permission[] = [
  // Módulo Usuários
  { id: 'perm-1', codigo: 'usuarios.visualizar', descricao: 'Visualizar usuários', modulo: 'Usuários' },
  { id: 'perm-2', codigo: 'usuarios.criar', descricao: 'Criar usuários', modulo: 'Usuários' },
  { id: 'perm-3', codigo: 'usuarios.editar', descricao: 'Editar usuários', modulo: 'Usuários' },
  { id: 'perm-4', codigo: 'usuarios.excluir', descricao: 'Excluir usuários', modulo: 'Usuários' },
  { id: 'perm-5', codigo: 'usuarios.gerenciar_roles', descricao: 'Gerenciar roles de usuários', modulo: 'Usuários' },

  // Módulo Roles
  { id: 'perm-6', codigo: 'roles.visualizar', descricao: 'Visualizar roles', modulo: 'Roles' },
  { id: 'perm-7', codigo: 'roles.criar', descricao: 'Criar roles', modulo: 'Roles' },
  { id: 'perm-8', codigo: 'roles.editar', descricao: 'Editar roles', modulo: 'Roles' },
  { id: 'perm-9', codigo: 'roles.excluir', descricao: 'Excluir roles', modulo: 'Roles' },

  // Módulo Ativos
  { id: 'perm-10', codigo: 'ativos.visualizar', descricao: 'Visualizar ativos', modulo: 'Ativos' },
  { id: 'perm-11', codigo: 'ativos.criar', descricao: 'Criar ativos', modulo: 'Ativos' },
  { id: 'perm-12', codigo: 'ativos.editar', descricao: 'Editar ativos', modulo: 'Ativos' },
  { id: 'perm-13', codigo: 'ativos.excluir', descricao: 'Excluir ativos', modulo: 'Ativos' },
  { id: 'perm-14', codigo: 'ativos.emprestar', descricao: 'Emprestar ativos', modulo: 'Ativos' },
  { id: 'perm-15', codigo: 'ativos.devolver', descricao: 'Devolver ativos', modulo: 'Ativos' },
  { id: 'perm-16', codigo: 'ativos.baixa', descricao: 'Registrar baixa de ativos', modulo: 'Ativos' },
  { id: 'perm-17', codigo: 'ativos.visualizar_proprios', descricao: 'Visualizar apenas próprios empréstimos', modulo: 'Ativos' },

  // Módulo Termos
  { id: 'perm-18', codigo: 'termos.gerar', descricao: 'Gerar termos', modulo: 'Termos' },
  { id: 'perm-19', codigo: 'termos.visualizar_todos', descricao: 'Visualizar todos os termos', modulo: 'Termos' },
  { id: 'perm-20', codigo: 'termos.visualizar_proprio', descricao: 'Visualizar próprios termos', modulo: 'Termos' },
  { id: 'perm-21', codigo: 'termos.assinar', descricao: 'Assinar termos', modulo: 'Termos' },
  { id: 'perm-22', codigo: 'termos.excluir', descricao: 'Excluir termos', modulo: 'Termos' },

  // Módulo Relatórios
  { id: 'perm-23', codigo: 'relatorios.visualizar', descricao: 'Visualizar relatórios', modulo: 'Relatórios' },
  { id: 'perm-24', codigo: 'relatorios.gerar', descricao: 'Gerar relatórios', modulo: 'Relatórios' },
  { id: 'perm-25', codigo: 'relatorios.exportar', descricao: 'Exportar relatórios', modulo: 'Relatórios' },

  // Módulo Configurações
  { id: 'perm-26', codigo: 'configuracoes.visualizar', descricao: 'Visualizar configurações', modulo: 'Configurações' },
  { id: 'perm-27', codigo: 'configuracoes.editar', descricao: 'Editar configurações', modulo: 'Configurações' },

  // Módulo Dashboard
  { id: 'perm-28', codigo: 'dashboard.visualizar', descricao: 'Visualizar dashboard', modulo: 'Dashboard' },
  { id: 'perm-29', codigo: 'dashboard.executivo', descricao: 'Visualizar dashboard executivo', modulo: 'Dashboard' },
];

// ===== ROLES =====
export const mockRoles: Role[] = [
  {
    id: 'role-1',
    nome: 'Superadmin',
    tipo: 'superadmin',
    descricao: 'Acesso total ao sistema, configurações críticas e gerenciamento completo',
    permissoes: mockPermissions.map(p => p.codigo), // Todas as permissões
    usuariosCount: 1,
  },
  {
    id: 'role-2',
    nome: 'Administrador',
    tipo: 'administrador',
    descricao: 'Gestão de usuários, ativos e relatórios gerenciais',
    permissoes: [
      'usuarios.visualizar', 'usuarios.criar', 'usuarios.editar', 'usuarios.gerenciar_roles',
      'roles.visualizar', 'roles.criar', 'roles.editar',
      'ativos.visualizar', 'ativos.criar', 'ativos.editar', 'ativos.emprestar', 'ativos.devolver', 'ativos.baixa',
      'termos.gerar', 'termos.visualizar_todos', 'termos.assinar',
      'relatorios.visualizar', 'relatorios.gerar', 'relatorios.exportar',
      'dashboard.visualizar', 'dashboard.executivo',
    ],
    usuariosCount: 2,
  },
  {
    id: 'role-3',
    nome: 'Analista TI',
    tipo: 'analista_ti',
    descricao: 'Suporte técnico, manutenção e empréstimos de ativos',
    permissoes: [
      'usuarios.visualizar',
      'ativos.visualizar', 'ativos.criar', 'ativos.editar', 'ativos.emprestar', 'ativos.devolver',
      'termos.gerar', 'termos.visualizar_todos', 'termos.assinar',
      'relatorios.visualizar',
      'dashboard.visualizar',
    ],
    usuariosCount: 2,
  },
  {
    id: 'role-4',
    nome: 'Diretoria',
    tipo: 'diretoria',
    descricao: 'Aprovações, dashboards executivos e relatórios gerenciais',
    permissoes: [
      'usuarios.visualizar',
      'ativos.visualizar',
      'termos.visualizar_todos',
      'relatorios.visualizar', 'relatorios.gerar', 'relatorios.exportar',
      'dashboard.visualizar', 'dashboard.executivo',
    ],
    usuariosCount: 1,
  },
  {
    id: 'role-5',
    nome: 'Gerente',
    tipo: 'gerente',
    descricao: 'Gestão de área e aprovação de empréstimos do setor',
    permissoes: [
      'usuarios.visualizar',
      'ativos.visualizar', 'ativos.emprestar', 'ativos.devolver',
      'termos.visualizar_todos', 'termos.assinar',
      'relatorios.visualizar',
      'dashboard.visualizar',
    ],
    usuariosCount: 1,
  },
  {
    id: 'role-6',
    nome: 'Analista',
    tipo: 'analista',
    descricao: 'Operacional, solicitar empréstimos e visualizar próprios termos',
    permissoes: [
      'ativos.visualizar', 'ativos.emprestar',
      'termos.visualizar_proprio', 'termos.assinar',
      'dashboard.visualizar',
    ],
    usuariosCount: 1,
  },
  {
    id: 'role-7',
    nome: 'Colaborador',
    tipo: 'colaborador',
    descricao: 'Solicitar empréstimos e assinar termos',
    permissoes: [
      'ativos.visualizar_proprios',
      'termos.visualizar_proprio', 'termos.assinar',
    ],
    usuariosCount: 1,
  },
  {
    id: 'role-8',
    nome: 'Estagiário',
    tipo: 'estagiario',
    descricao: 'Acesso limitado, somente visualização de próprios itens',
    permissoes: [
      'ativos.visualizar_proprios',
      'termos.visualizar_proprio',
    ],
    usuariosCount: 1,
  },
];

// ===== USUÁRIOS =====
export const mockUsers: User[] = [
  {
    id: 'user-1',
    nome: 'Juan Carlos',
    email: 'juan.carlos@ceap.org.br',
    cpf: '123.456.789-00',
    telefone: '(21) 98765-4321',
    cargo: 'Coordenador de TI',
    setor: 'ATIS',
    foto_url: 'https://ui-avatars.com/api/?name=Juan+Carlos&background=06b6d4&color=fff&size=200',
    role_id: 'role-1',
    status: 'ativo',
    data_admissao: '2020-01-15',
    ultimo_acesso: '2024-01-18 14:30:00',
    created_at: '2020-01-15T00:00:00Z',
    updated_at: '2024-01-18T14:30:00Z',
  },
  {
    id: 'user-2',
    nome: 'Maria Silva Santos',
    email: 'maria.santos@ceap.org.br',
    cpf: '234.567.890-11',
    telefone: '(21) 98765-4322',
    cargo: 'Administradora de Sistemas',
    setor: 'ATIS',
    foto_url: 'https://ui-avatars.com/api/?name=Maria+Silva&background=8b5cf6&color=fff&size=200',
    role_id: 'role-2',
    status: 'ativo',
    data_admissao: '2020-03-20',
    ultimo_acesso: '2024-01-18 13:15:00',
    created_at: '2020-03-20T00:00:00Z',
    updated_at: '2024-01-18T13:15:00Z',
  },
  {
    id: 'user-3',
    nome: 'Carlos Eduardo Oliveira',
    email: 'carlos.oliveira@ceap.org.br',
    cpf: '345.678.901-22',
    telefone: '(21) 98765-4323',
    cargo: 'Administrador',
    setor: 'ATIS',
    foto_url: 'https://ui-avatars.com/api/?name=Carlos+Eduardo&background=10b981&color=fff&size=200',
    role_id: 'role-2',
    status: 'ativo',
    data_admissao: '2021-06-10',
    ultimo_acesso: '2024-01-17 16:45:00',
    created_at: '2021-06-10T00:00:00Z',
    updated_at: '2024-01-17T16:45:00Z',
  },
  {
    id: 'user-4',
    nome: 'Ana Paula Rodrigues',
    email: 'ana.rodrigues@ceap.org.br',
    cpf: '456.789.012-33',
    telefone: '(21) 98765-4324',
    cargo: 'Analista de Suporte',
    setor: 'ATIS',
    foto_url: 'https://ui-avatars.com/api/?name=Ana+Paula&background=f59e0b&color=fff&size=200',
    role_id: 'role-3',
    status: 'ativo',
    data_admissao: '2021-09-01',
    ultimo_acesso: '2024-01-18 10:20:00',
    created_at: '2021-09-01T00:00:00Z',
    updated_at: '2024-01-18T10:20:00Z',
  },
  {
    id: 'user-5',
    nome: 'Roberto Alves Costa',
    email: 'roberto.costa@ceap.org.br',
    cpf: '567.890.123-44',
    telefone: '(21) 98765-4325',
    cargo: 'Técnico de TI',
    setor: 'ATIS',
    foto_url: 'https://ui-avatars.com/api/?name=Roberto+Alves&background=ef4444&color=fff&size=200',
    role_id: 'role-3',
    status: 'ativo',
    data_admissao: '2022-02-14',
    ultimo_acesso: '2024-01-18 09:00:00',
    created_at: '2022-02-14T00:00:00Z',
    updated_at: '2024-01-18T09:00:00Z',
  },
  {
    id: 'user-6',
    nome: 'Fernanda Lima Souza',
    email: 'fernanda.souza@ceap.org.br',
    cpf: '678.901.234-55',
    telefone: '(21) 98765-4326',
    cargo: 'Diretora Executiva',
    setor: 'Diretoria',
    foto_url: 'https://ui-avatars.com/api/?name=Fernanda+Lima&background=8b5cf6&color=fff&size=200',
    role_id: 'role-4',
    status: 'ativo',
    data_admissao: '2019-05-01',
    ultimo_acesso: '2024-01-17 17:30:00',
    created_at: '2019-05-01T00:00:00Z',
    updated_at: '2024-01-17T17:30:00Z',
  },
  {
    id: 'user-7',
    nome: 'Paulo Henrique Martins',
    email: 'paulo.martins@ceap.org.br',
    cpf: '789.012.345-66',
    telefone: '(21) 98765-4327',
    cargo: 'Gerente de Projetos',
    setor: 'Projeto Aluandê',
    foto_url: 'https://ui-avatars.com/api/?name=Paulo+Henrique&background=06b6d4&color=fff&size=200',
    role_id: 'role-5',
    status: 'ativo',
    data_admissao: '2020-08-15',
    ultimo_acesso: '2024-01-18 11:00:00',
    created_at: '2020-08-15T00:00:00Z',
    updated_at: '2024-01-18T11:00:00Z',
  },
  {
    id: 'user-8',
    nome: 'Juliana Pereira Santos',
    email: 'juliana.santos@ceap.org.br',
    cpf: '890.123.456-77',
    telefone: '(21) 98765-4328',
    cargo: 'Analista de Projetos',
    setor: 'Projeto Orunmilá',
    foto_url: 'https://ui-avatars.com/api/?name=Juliana+Pereira&background=10b981&color=fff&size=200',
    role_id: 'role-6',
    status: 'ativo',
    data_admissao: '2021-11-20',
    ultimo_acesso: '2024-01-18 08:45:00',
    created_at: '2021-11-20T00:00:00Z',
    updated_at: '2024-01-18T08:45:00Z',
  },
  {
    id: 'user-9',
    nome: 'Ricardo Barbosa Lima',
    email: 'ricardo.lima@ceap.org.br',
    cpf: '901.234.567-88',
    telefone: '(21) 98765-4329',
    cargo: 'Assistente Administrativo',
    setor: 'Administrativo',
    foto_url: 'https://ui-avatars.com/api/?name=Ricardo+Barbosa&background=f59e0b&color=fff&size=200',
    role_id: 'role-7',
    status: 'ativo',
    data_admissao: '2022-04-10',
    ultimo_acesso: '2024-01-17 15:20:00',
    created_at: '2022-04-10T00:00:00Z',
    updated_at: '2024-01-17T15:20:00Z',
  },
  {
    id: 'user-10',
    nome: 'Beatriz Costa Ferreira',
    email: 'beatriz.ferreira@ceap.org.br',
    cpf: '012.345.678-99',
    telefone: '(21) 98765-4330',
    cargo: 'Estagiária',
    setor: 'Administrativo',
    foto_url: 'https://ui-avatars.com/api/?name=Beatriz+Costa&background=ef4444&color=fff&size=200',
    role_id: 'role-8',
    status: 'ativo',
    data_admissao: '2023-08-01',
    ultimo_acesso: '2024-01-18 12:00:00',
    created_at: '2023-08-01T00:00:00Z',
    updated_at: '2024-01-18T12:00:00Z',
  },
];

// Função helper para buscar role por ID
export const getRoleById = (roleId: string): Role | undefined => {
  return mockRoles.find(r => r.id === roleId);
};

// Função helper para buscar permissões de uma role
export const getPermissionsByRole = (roleId: string): Permission[] => {
  const role = getRoleById(roleId);
  if (!role) return [];
  return mockPermissions.filter(p => role.permissoes.includes(p.codigo));
};

// Função helper para verificar se usuário tem permissão
export const userHasPermission = (user: User, permissionCode: string): boolean => {
  const role = getRoleById(user.role_id);
  if (!role) return false;
  return role.permissoes.includes(permissionCode);
};
