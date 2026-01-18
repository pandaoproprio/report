import { useAuth } from '@/contexts/AuthContext';

export const usePermission = (permissionCode: string): boolean => {
  const { hasPermission } = useAuth();
  return hasPermission(permissionCode);
};

export const useHasAnyPermission = (permissionCodes: string[]): boolean => {
  const { hasPermission } = useAuth();
  return permissionCodes.some(code => hasPermission(code));
};

export const useHasAllPermissions = (permissionCodes: string[]): boolean => {
  const { hasPermission } = useAuth();
  return permissionCodes.every(code => hasPermission(code));
};
