// ===== ROLES E PERMISSÕES =====
export type RoleType =
  | 'superadmin'
  | 'administrador'
  | 'analista_ti'
  | 'diretoria'
  | 'gerente'
  | 'analista'
  | 'colaborador'
  | 'estagiario';

export interface Permission {
  id: string;
  codigo: string; // formato: modulo.recurso.acao (ex: usuarios.criar)
  descricao: string;
  modulo: string;
}

export interface Role {
  id: string;
  nome: string;
  tipo: RoleType;
  descricao: string;
  permissoes: string[]; // array de códigos de permissões
  usuariosCount?: number;
}

// ===== USUÁRIOS =====
export type UserStatus = 'ativo' | 'inativo';

export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  cargo: string;
  setor: string;
  foto_url?: string;
  role_id: string;
  status: UserStatus;
  data_admissao: string;
  ultimo_acesso?: string;
  motivoInativacao?: string;
  created_at: string;
  updated_at: string;
}

// ===== HISTÓRICO =====
export interface HistoricoAlteracao {
  id: string;
  usuario_id: string;
  tipo: 'criacao' | 'edicao' | 'inativacao' | 'ativacao';
  campo?: string;
  valor_anterior?: string;
  valor_novo?: string;
  descricao: string;
  data: string;
  autor_id: string;
  autor_nome: string;
}

// ===== CONTEXT =====
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permissionCode: string) => boolean;
  hasRole: (role: RoleType) => boolean;
}

// ===== FORM DATA =====
export interface UserFormData {
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  cargo: string;
  setor: string;
  foto_url?: string;
  role_id: string;
  status: UserStatus;
  data_admissao: string;
  motivoInativacao?: string;
}

export interface RoleFormData {
  nome: string;
  tipo: RoleType;
  descricao: string;
  permissoes: string[];
}

// ===== SETORES =====
export const SETORES = [
  'ATIS',
  'Diretoria',
  'Projeto Aluandê',
  'Projeto Orunmilá',
  'Administrativo',
  'Financeiro',
  'Recursos Humanos',
] as const;

export type Setor = typeof SETORES[number];
