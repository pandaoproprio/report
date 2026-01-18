import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockUsers, getRoleById } from '@/data/mockData';
import type { User } from '@/types';

const getRoleBadgeColor = (roleType: string): "default" | "secondary" | "destructive" | "success" | "warning" | "outline" => {
  const colors: Record<string, "default" | "secondary" | "destructive" | "success" | "warning" | "outline"> = {
    superadmin: 'destructive',
    administrador: 'default',
    analista_ti: 'secondary',
    diretoria: 'success',
    gerente: 'warning',
    analista: 'outline',
    colaborador: 'outline',
    estagiario: 'outline',
  };
  return colors[roleType] || 'outline';
};

export const Users: React.FC = () => {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const role = getRoleById(user.role_id);
    const matchesRole = filterRole === 'all' || role?.tipo === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Usuários</h1>
          <p className="text-text-secondary">Gerencie os usuários do sistema</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filtrar por role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as roles</SelectItem>
            <SelectItem value="superadmin">Superadmin</SelectItem>
            <SelectItem value="administrador">Administrador</SelectItem>
            <SelectItem value="analista_ti">Analista TI</SelectItem>
            <SelectItem value="diretoria">Diretoria</SelectItem>
            <SelectItem value="gerente">Gerente</SelectItem>
            <SelectItem value="analista">Analista</SelectItem>
            <SelectItem value="colaborador">Colaborador</SelectItem>
            <SelectItem value="estagiario">Estagiário</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const role = getRoleById(user.role_id);

              return (
                <TableRow key={user.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.foto_url} alt={user.nome} />
                        <AvatarFallback>
                          {user.nome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary">{user.email}</TableCell>
                  <TableCell>{user.cargo}</TableCell>
                  <TableCell>{user.setor}</TableCell>
                  <TableCell>
                    {role && (
                      <Badge variant={getRoleBadgeColor(role.tipo)}>
                        {role.nome}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'ativo' ? 'success' : 'destructive'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">
                    {user.ultimo_acesso
                      ? new Date(user.ultimo_acesso).toLocaleString('pt-BR')
                      : 'Nunca'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-text-secondary">Nenhum usuário encontrado</p>
          </div>
        )}
      </div>

      {/* Pagination info */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <p>
          Mostrando {filteredUsers.length} de {users.length} usuário(s)
        </p>
      </div>
    </div>
  );
};
