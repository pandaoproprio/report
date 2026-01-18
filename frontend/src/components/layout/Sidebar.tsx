import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  HardDrive,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  Radar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { usePermission } from '@/hooks/usePermission';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  permission?: string;
  children?: {
    title: string;
    href: string;
    permission?: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    permission: 'dashboard.visualizar',
  },
  {
    title: 'Usuários',
    icon: Users,
    permission: 'usuarios.visualizar',
    children: [
      { title: 'Listar', href: '/usuarios', permission: 'usuarios.visualizar' },
      { title: 'Roles', href: '/usuarios/roles', permission: 'roles.visualizar' },
    ],
  },
  {
    title: 'Ativos',
    icon: HardDrive,
    permission: 'ativos.visualizar',
    children: [
      { title: 'Inventário', href: '/ativos', permission: 'ativos.visualizar' },
      { title: 'Categorias', href: '/ativos/categorias', permission: 'ativos.visualizar' },
      { title: 'Empréstimos', href: '/ativos/emprestimos', permission: 'ativos.visualizar' },
    ],
  },
  {
    title: 'Termos',
    icon: FileText,
    permission: 'termos.visualizar_todos',
    children: [
      { title: 'Gerar', href: '/termos/gerar', permission: 'termos.gerar' },
      { title: 'Histórico', href: '/termos/historico', permission: 'termos.visualizar_todos' },
    ],
  },
  {
    title: 'Relatórios',
    icon: BarChart3,
    href: '/relatorios',
    permission: 'relatorios.visualizar',
  },
  {
    title: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
    permission: 'configuracoes.visualizar',
  },
];

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };

  const hasPermission = (permission?: string): boolean => {
    if (!permission) return true;
    return usePermission(permission);
  };

  const isActive = (href: string): boolean => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <aside
      className={cn(
        'flex h-screen w-[280px] flex-col border-r border-border bg-card',
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <Radar className="h-8 w-8 text-accent" />
        <div>
          <h1 className="text-xl font-bold text-text-primary">AnnITrack</h1>
          <p className="text-xs text-text-secondary">by AnnITech</p>
        </div>
      </div>

      <Separator />

      {/* Menu Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map(item => {
            if (!hasPermission(item.permission)) return null;

            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.title);

            if (!hasChildren && item.href) {
              return (
                <li key={item.title}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-default',
                      isActive(item.href)
                        ? 'bg-accent text-white'
                        : 'text-text-secondary hover:bg-card hover:text-accent'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            }

            if (hasChildren) {
              return (
                <li key={item.title}>
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-default',
                      'text-text-secondary hover:bg-card hover:text-accent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <ul className="ml-9 mt-1 space-y-1">
                      {item.children?.map(child => {
                        if (!hasPermission(child.permission)) return null;

                        return (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={cn(
                                'block rounded-lg px-3 py-2 text-sm transition-default',
                                isActive(child.href)
                                  ? 'bg-accent text-white'
                                  : 'text-text-secondary hover:bg-card hover:text-accent'
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            return null;
          })}
        </ul>
      </nav>

      <Separator />

      {/* User Info */}
      {user && (
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.foto_url} alt={user.nome} />
              <AvatarFallback>
                {user.nome.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-text-primary">
                {user.nome}
              </p>
              <p className="truncate text-xs text-text-secondary">{user.cargo}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <p className="text-center text-xs text-text-secondary">
          AnnITrack v1.0
          <br />
          AnnITech - IT Solutions
        </p>
      </div>
    </aside>
  );
};
