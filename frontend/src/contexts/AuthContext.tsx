import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, User, RoleType } from '@/types';
import { mockUsers, getRoleById } from '@/data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há usuário no localStorage
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, _password: string): Promise<void> => {
    // Simulação de login (em produção, fazer chamada à API)
    const foundUser = mockUsers.find(u => u.email === email);

    if (!foundUser) {
      throw new Error('Usuário não encontrado');
    }

    if (foundUser.status === 'inativo') {
      throw new Error('Usuário inativo');
    }

    // Simular senha (em produção, validar com backend)
    // Para demo, aceita qualquer senha
    setUser(foundUser);
    localStorage.setItem('auth_user', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const hasPermission = (permissionCode: string): boolean => {
    if (!user) return false;

    const role = getRoleById(user.role_id);
    if (!role) return false;

    return role.permissoes.includes(permissionCode);
  };

  const hasRole = (roleType: RoleType): boolean => {
    if (!user) return false;

    const role = getRoleById(user.role_id);
    if (!role) return false;

    return role.tipo === roleType;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasPermission,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
