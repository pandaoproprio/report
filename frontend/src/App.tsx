import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Roles } from './pages/Roles';
import { Unauthorized } from './pages/Unauthorized';
import { InventarioAtivos } from './pages/ativos/InventarioAtivos';
import { EmprestimosAtivos } from './pages/ativos/EmprestimosAtivos';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredPermission="dashboard.visualizar">
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <ProtectedRoute requiredPermission="usuarios.visualizar">
                <MainLayout>
                  <Users />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios/roles"
            element={
              <ProtectedRoute requiredPermission="roles.visualizar">
                <MainLayout>
                  <Roles />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Ativos Routes */}
          <Route
            path="/ativos"
            element={
              <ProtectedRoute requiredPermission="ativos.visualizar">
                <MainLayout>
                  <InventarioAtivos />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ativos/emprestimos"
            element={
              <ProtectedRoute requiredPermission="ativos.visualizar">
                <MainLayout>
                  <EmprestimosAtivos />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ativos/categorias"
            element={
              <ProtectedRoute requiredPermission="ativos.visualizar">
                <MainLayout>
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Categorias</h1>
                    <p className="text-text-secondary mt-2">Em desenvolvimento</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Placeholder routes for future modules */}

          <Route
            path="/termos/*"
            element={
              <ProtectedRoute requiredPermission="termos.visualizar_todos">
                <MainLayout>
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Termos</h1>
                    <p className="text-text-secondary mt-2">Em desenvolvimento - PASSO 3</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/relatorios"
            element={
              <ProtectedRoute requiredPermission="relatorios.visualizar">
                <MainLayout>
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Relatórios</h1>
                    <p className="text-text-secondary mt-2">Em desenvolvimento</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/configuracoes"
            element={
              <ProtectedRoute requiredPermission="configuracoes.visualizar">
                <MainLayout>
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Configurações</h1>
                    <p className="text-text-secondary mt-2">Em desenvolvimento</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 - Not Found */}
          <Route
            path="*"
            element={
              <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-text-primary">404</h1>
                  <p className="mt-4 text-text-secondary">Página não encontrada</p>
                  <a
                    href="/dashboard"
                    className="mt-6 inline-block rounded-lg bg-accent px-6 py-2 text-white hover:bg-accent/90"
                  >
                    Voltar ao Dashboard
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
