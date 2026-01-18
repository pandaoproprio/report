import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { RoleType } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: RoleType;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredRole,
  requireAuth = true,
}) => {
  const { user, hasPermission, hasRole } = useAuth();

  // Se requer autenticação e usuário não está logado
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // Se requer permissão específica e usuário não tem
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Se requer role específica e usuário não tem
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
