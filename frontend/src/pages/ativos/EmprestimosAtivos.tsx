import React, { useState } from 'react';
import { Plus, Search, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getEmprestimosAtivos, getEmprestimosAtrasados, getAtivoById } from '@/data/mockAtivos';
import { mockUsers } from '@/data/mockData';
import { format, parseISO, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { Emprestimo } from '@/types';

const getStatusBadge = (emprestimo: Emprestimo) => {
  if (emprestimo.status === 'atrasado') {
    return (
      <Badge className="bg-danger text-white">
        <AlertCircle className="mr-1 h-3 w-3" />
        Atrasado
      </Badge>
    );
  }

  const previsao = parseISO(emprestimo.previsao_devolucao);
  if (isPast(previsao) && emprestimo.status === 'ativo') {
    return (
      <Badge className="bg-danger text-white">
        <AlertCircle className="mr-1 h-3 w-3" />
        Vencido
      </Badge>
    );
  }

  return (
    <Badge className="bg-accent text-white">
      <CheckCircle className="mr-1 h-3 w-3" />
      Ativo
    </Badge>
  );
};

export const EmprestimosAtivos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSetor, setFilterSetor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const emprestimosAtivos = getEmprestimosAtivos();
  const emprestimosAtrasados = getEmprestimosAtrasados();

  const filteredEmprestimos = emprestimosAtivos.filter(emp => {
    const ativo = getAtivoById(emp.ativo_id);
    const usuario = mockUsers.find(u => u.id === emp.usuario_id);

    const matchesSearch =
      ativo?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ativo?.codigo_patrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario?.nome.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSetor = filterSetor === 'all' || usuario?.setor === filterSetor;

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'atrasado' && (emp.status === 'atrasado' || isPast(parseISO(emp.previsao_devolucao)))) ||
      (filterStatus === 'ativo' && emp.status === 'ativo' && !isPast(parseISO(emp.previsao_devolucao)));

    return matchesSearch && matchesSetor && matchesStatus;
  });

  const setores = Array.from(new Set(mockUsers.map(u => u.setor)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Empréstimos Ativos</h1>
          <p className="text-text-secondary">Acompanhe os ativos emprestados</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Empréstimo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total de Empréstimos</p>
              <p className="text-2xl font-bold text-text-primary">{emprestimosAtivos.length}</p>
            </div>
            <div className="rounded-full bg-accent/10 p-3">
              <FileText className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Empréstimos Atrasados</p>
              <p className="text-2xl font-bold text-danger">{emprestimosAtrasados.length}</p>
            </div>
            <div className="rounded-full bg-danger/10 p-3">
              <AlertCircle className="h-6 w-6 text-danger" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Com Termo Gerado</p>
              <p className="text-2xl font-bold text-success">
                {emprestimosAtivos.filter(e => e.termo_gerado).length}
              </p>
            </div>
            <div className="rounded-full bg-success/10 p-3">
              <FileText className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            placeholder="Buscar por ativo, código ou colaborador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterSetor} onValueChange={setFilterSetor}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Setor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os setores</SelectItem>
            {setores.map(setor => (
              <SelectItem key={setor} value={setor}>
                {setor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ativo">Ativos</SelectItem>
            <SelectItem value="atrasado">Atrasados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ativo</TableHead>
              <TableHead>Colaborador</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Data Empréstimo</TableHead>
              <TableHead>Previsão Devolução</TableHead>
              <TableHead>Termo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmprestimos.map((emprestimo) => {
              const ativo = getAtivoById(emprestimo.ativo_id);
              const usuario = mockUsers.find(u => u.id === emprestimo.usuario_id);
              const isVencido = isPast(parseISO(emprestimo.previsao_devolucao));

              return (
                <TableRow key={emprestimo.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-text-primary">{ativo?.nome}</p>
                      <p className="text-sm text-text-secondary">{ativo?.codigo_patrimonio}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {usuario && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={usuario.foto_url} alt={usuario.nome} />
                          <AvatarFallback>
                            {usuario.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{usuario.nome}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{usuario?.setor}</TableCell>
                  <TableCell className="text-sm">
                    {format(parseISO(emprestimo.data_emprestimo), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'text-sm',
                        isVencido ? 'text-danger font-semibold' : 'text-text-secondary'
                      )}
                    >
                      {format(parseISO(emprestimo.previsao_devolucao), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </TableCell>
                  <TableCell>
                    {emprestimo.termo_gerado ? (
                      <Button variant="ghost" size="sm" className="gap-1">
                        <FileText className="h-4 w-4" />
                        Ver Termo
                      </Button>
                    ) : (
                      <span className="text-xs text-text-secondary">Sem termo</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(emprestimo)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Devolver
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredEmprestimos.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-text-secondary mb-4" />
            <p className="text-text-secondary">Nenhum empréstimo encontrado</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <p>
          Mostrando {filteredEmprestimos.length} de {emprestimosAtivos.length} empréstimo(s)
        </p>
      </div>
    </div>
  );
};
