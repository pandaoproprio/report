import React, { useState } from 'react';
import { Plus, Search, Grid3x3, List, Package, CheckCircle2, Clock, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  mockAtivos,
  mockCategorias,
  getCategoriaById,
  getAtivosDisponiveis,
  getAtivosEmprestados,
  getAtivosEmManutencao,
} from '@/data/mockAtivos';
import { mockUsers } from '@/data/mockData';
import type { Ativo, AtivoStatus } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const getStatusColor = (status: AtivoStatus) => {
  const colors = {
    disponivel: 'bg-success text-white',
    emprestado: 'bg-accent text-white',
    manutencao: 'bg-warning text-white',
    baixa: 'bg-danger text-white',
  };
  return colors[status];
};

const getStatusLabel = (status: AtivoStatus) => {
  const labels = {
    disponivel: 'Disponível',
    emprestado: 'Emprestado',
    manutencao: 'Manutenção',
    baixa: 'Baixa',
  };
  return labels[status];
};

const AssetCard: React.FC<{ ativo: Ativo; onClick: () => void }> = ({ ativo, onClick }) => {
  const categoria = getCategoriaById(ativo.categoria_id);
  const responsavel = ativo.responsavel_atual_id
    ? mockUsers.find(u => u.id === ativo.responsavel_atual_id)
    : null;

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:border-accent"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="aspect-video relative mb-3 overflow-hidden rounded-lg bg-card border border-border">
          {ativo.foto_url ? (
            <img
              src={ativo.foto_url}
              alt={ativo.nome}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-12 w-12 text-text-secondary" />
            </div>
          )}
          <Badge
            className={cn(
              'absolute right-2 top-2',
              getStatusColor(ativo.status)
            )}
          >
            {getStatusLabel(ativo.status)}
          </Badge>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-xs text-text-secondary">{ativo.codigo_patrimonio}</p>
            <h3 className="font-semibold text-text-primary line-clamp-1">
              {ativo.nome}
            </h3>
          </div>

          {categoria && (
            <Badge variant="outline" className="text-xs">
              {categoria.nome}
            </Badge>
          )}

          {responsavel && (
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Avatar className="h-6 w-6">
                <AvatarImage src={responsavel.foto_url} alt={responsavel.nome} />
                <AvatarFallback className="text-xs">
                  {responsavel.nome.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-text-secondary truncate">
                {responsavel.nome}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const InventarioAtivos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const totalAtivos = mockAtivos.length;
  const ativosDisponiveis = getAtivosDisponiveis().length;
  const ativosEmprestados = getAtivosEmprestados().length;
  const ativosManutencao = getAtivosEmManutencao().length;

  const filteredAtivos = mockAtivos.filter(ativo => {
    const matchesSearch =
      ativo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ativo.codigo_patrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ativo.numero_serie?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategoria =
      filterCategoria === 'all' || ativo.categoria_id === filterCategoria;

    const matchesStatus = filterStatus === 'all' || ativo.status === filterStatus;

    return matchesSearch && matchesCategoria && matchesStatus;
  });

  const handleKPIClick = (status: string) => {
    setFilterStatus(status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Inventário de Ativos</h1>
          <p className="text-text-secondary">Gerencie o patrimônio de TI da organização</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Ativo
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-all hover:border-accent"
          onClick={() => handleKPIClick('all')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ativos</CardTitle>
            <Package className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAtivos}</div>
            <p className="text-xs text-text-secondary">Patrimônio total cadastrado</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all hover:border-success"
          onClick={() => handleKPIClick('disponivel')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{ativosDisponiveis}</div>
            <p className="text-xs text-text-secondary">Prontos para uso</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all hover:border-accent"
          onClick={() => handleKPIClick('emprestado')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emprestados</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{ativosEmprestados}</div>
            <p className="text-xs text-text-secondary">Em uso por colaboradores</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all hover:border-warning"
          onClick={() => handleKPIClick('manutencao')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Manutenção</CardTitle>
            <Wrench className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{ativosManutencao}</div>
            <p className="text-xs text-text-secondary">Aguardando reparo</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            placeholder="Buscar por código, nome ou número de série..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterCategoria} onValueChange={setFilterCategoria}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {mockCategorias.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="disponivel">Disponível</SelectItem>
            <SelectItem value="emprestado">Emprestado</SelectItem>
            <SelectItem value="manutencao">Manutenção</SelectItem>
            <SelectItem value="baixa">Baixa</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Assets Grid */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAtivos.map(ativo => (
            <AssetCard
              key={ativo.id}
              ativo={ativo}
              onClick={() => console.log('Abrir detalhes:', ativo.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-center text-text-secondary">Vista em lista (em desenvolvimento)</p>
        </div>
      )}

      {filteredAtivos.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-text-secondary mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Nenhum ativo encontrado
          </h3>
          <p className="text-text-secondary mb-4">
            Tente ajustar os filtros ou adicione um novo ativo
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Ativo
          </Button>
        </div>
      )}

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <p>
          Mostrando {filteredAtivos.length} de {totalAtivos} ativo(s)
        </p>
      </div>
    </div>
  );
};
