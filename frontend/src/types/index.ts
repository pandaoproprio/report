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

// ===== CATEGORIAS DE ATIVOS =====
export type CategoriaAtivoType =
  | 'Computadores'
  | 'Periféricos'
  | 'Acessórios'
  | 'Armazenamento'
  | 'Rede'
  | 'Audiovisual';

export interface CategoriaAtivo {
  id: string;
  nome: CategoriaAtivoType;
  descricao: string;
  icone: string; // Nome do ícone Lucide
  cor: string;
}

// ===== ATIVOS =====
export type AtivoStatus = 'disponivel' | 'emprestado' | 'manutencao' | 'baixa';

export interface Ativo {
  id: string;
  codigo_patrimonio: string; // CEAP-TI-0001
  nome: string;
  categoria_id: string;
  marca?: string;
  modelo?: string;
  numero_serie?: string;
  especificacoes?: Record<string, any>; // JSON com specs técnicas
  valor_estimado?: number;
  data_aquisicao: string;
  garantia_ate?: string;
  localizacao_fisica?: string;
  foto_url?: string;
  status: AtivoStatus;
  responsavel_atual_id?: string; // ID do usuário que está com o ativo
  created_at: string;
  updated_at: string;
}

// ===== EMPRÉSTIMOS =====
export type EmprestimoStatus = 'ativo' | 'devolvido' | 'atrasado';

export interface Emprestimo {
  id: string;
  ativo_id: string;
  usuario_id: string; // Quem pegou emprestado
  responsavel_ti_id: string; // Quem registrou o empréstimo
  data_emprestimo: string;
  previsao_devolucao: string;
  data_devolucao?: string;
  observacoes?: string;
  termo_gerado: boolean;
  termo_id?: string;
  status: EmprestimoStatus;
  checklist_devolucao?: {
    funcionando: boolean;
    com_acessorios: boolean;
    sem_danos: boolean;
    observacoes?: string;
    foto_estado_url?: string;
  };
  created_at: string;
  updated_at: string;
}

// ===== HISTÓRICO DE MOVIMENTAÇÕES =====
export type TipoMovimentacao =
  | 'emprestimo'
  | 'devolucao'
  | 'manutencao_enviada'
  | 'manutencao_retornada'
  | 'baixa'
  | 'atualizacao';

export interface HistoricoAtivo {
  id: string;
  ativo_id: string;
  tipo_movimentacao: TipoMovimentacao;
  usuario_id: string; // Quem fez a ação
  usuario_nome: string;
  descricao: string;
  observacoes?: string;
  data: string;
}

// ===== NFC =====
export interface NFCTag {
  id: string;
  ativo_id: string;
  tag_serial_number?: string;
  data_gravacao: string;
  gravado_por_id: string;
  status: 'ativo' | 'substituido' | 'perdido';
}

export interface NFCReadData {
  id: string;
  codigo: string;
  nome: string;
  url: string;
}

// ===== FORM DATA =====
export interface AtivoFormData {
  codigo_patrimonio: string;
  nome: string;
  categoria_id: string;
  marca?: string;
  modelo?: string;
  numero_serie?: string;
  especificacoes?: Record<string, any>;
  valor_estimado?: number;
  data_aquisicao: string;
  garantia_ate?: string;
  localizacao_fisica?: string;
  foto_url?: string;
}

export interface EmprestimoFormData {
  ativo_id: string;
  usuario_id: string;
  previsao_devolucao: string;
  observacoes?: string;
  gerar_termo: boolean;
}

export interface DevolucaoFormData {
  funcionando: boolean;
  com_acessorios: boolean;
  sem_danos: boolean;
  observacoes?: string;
  foto_estado_url?: string;
}
