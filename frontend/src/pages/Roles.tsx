import React from 'react';
import { Shield, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockRoles, mockPermissions } from '@/data/mockData';

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

export const Roles: React.FC = () => {
  const groupPermissionsByModule = (permissionCodes: string[]) => {
    const grouped: Record<string, string[]> = {};

    permissionCodes.forEach(code => {
      const permission = mockPermissions.find(p => p.codigo === code);
      if (permission) {
        if (!grouped[permission.modulo]) {
          grouped[permission.modulo] = [];
        }
        grouped[permission.modulo].push(permission.descricao);
      }
    });

    return grouped;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Roles e Permissões</h1>
          <p className="text-text-secondary">
            Gerencie as funções e permissões do sistema
          </p>
        </div>
        <Button className="gap-2">
          <Shield className="h-4 w-4" />
          Nova Role
        </Button>
      </div>

      {/* Roles Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockRoles.map((role) => {
          const permissionsByModule = groupPermissionsByModule(role.permissoes);

          return (
            <Card key={role.id} className="overflow-hidden">
              <CardHeader className="border-b border-border bg-card/50">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle>{role.nome}</CardTitle>
                      <Badge variant={getRoleBadgeColor(role.tipo)}>
                        {role.tipo}
                      </Badge>
                    </div>
                    <CardDescription>{role.descricao}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{role.usuariosCount}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <h4 className="mb-3 text-sm font-semibold text-text-primary">
                  Permissões ({role.permissoes.length})
                </h4>

                <div className="space-y-4">
                  {Object.entries(permissionsByModule).map(([modulo, permissions]) => (
                    <div key={modulo}>
                      <h5 className="mb-2 text-xs font-medium text-accent">
                        {modulo}
                      </h5>
                      <ul className="space-y-1">
                        {permissions.map((permission, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-text-secondary"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                            {permission}
                          </li>
                        ))}
                      </ul>
                      {Object.keys(permissionsByModule).indexOf(modulo) <
                        Object.keys(permissionsByModule).length - 1 && (
                        <Separator className="mt-3" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Permissões</CardTitle>
          <CardDescription>
            Visão completa de todas as permissões por módulo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(
              mockPermissions.reduce((acc, permission) => {
                if (!acc[permission.modulo]) {
                  acc[permission.modulo] = [];
                }
                acc[permission.modulo].push(permission);
                return acc;
              }, {} as Record<string, typeof mockPermissions>)
            ).map(([modulo, permissions]) => (
              <div key={modulo}>
                <h3 className="mb-2 font-semibold text-accent">{modulo}</h3>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="rounded-lg border border-border bg-card/50 p-3"
                    >
                      <p className="text-sm font-medium text-text-primary">
                        {permission.descricao}
                      </p>
                      <code className="text-xs text-text-secondary">
                        {permission.codigo}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
