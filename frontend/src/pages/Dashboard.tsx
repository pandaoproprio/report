import React from 'react';
import { Users, HardDrive, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsers } from '@/data/mockData';
import { getRoleById } from '@/data/mockData';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: string;
}> = ({ title, value, description, icon: Icon, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-text-secondary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-text-secondary">{description}</p>
      )}
      {trend && (
        <div className="flex items-center gap-1 text-xs text-success mt-1">
          <TrendingUp className="h-3 w-3" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const role = user ? getRoleById(user.role_id) : null;

  const activeUsers = mockUsers.filter(u => u.status === 'ativo').length;
  const totalUsers = mockUsers.length;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          Bem-vindo, {user?.nome.split(' ')[0]}!
        </h1>
        <p className="text-text-secondary">
          Aqui está um resumo do sistema AnnITrack
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Usuários Ativos"
          value={activeUsers}
          description={`de ${totalUsers} total`}
          icon={Users}
          trend="+2 este mês"
        />
        <StatCard
          title="Ativos Cadastrados"
          value="45"
          description="15 disponíveis"
          icon={HardDrive}
        />
        <StatCard
          title="Empréstimos Ativos"
          value="18"
          description="3 atrasados"
          icon={FileText}
        />
        <StatCard
          title="Termos Gerados"
          value="127"
          description="este ano"
          icon={FileText}
          trend="+12 este mês"
        />
      </div>

      {/* Additional Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Suas Informações</CardTitle>
            <CardDescription>Dados da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Email:</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Cargo:</span>
              <span className="text-sm font-medium">{user?.cargo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Setor:</span>
              <span className="text-sm font-medium">{user?.setor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Role:</span>
              <span className="text-sm font-medium">{role?.nome}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <p className="text-sm">Novo usuário cadastrado</p>
                <span className="ml-auto text-xs text-text-secondary">2h</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <p className="text-sm">Ativo devolvido</p>
                <span className="ml-auto text-xs text-text-secondary">5h</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-warning"></div>
                <p className="text-sm">Termo aguardando assinatura</p>
                <span className="ml-auto text-xs text-text-secondary">1d</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
