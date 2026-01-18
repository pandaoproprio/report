import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Radar className="h-10 w-10 text-accent" />
          </div>
          <div>
            <CardTitle className="text-3xl">AnnITrack</CardTitle>
            <p className="text-sm text-text-secondary">by AnnITech - IT Solutions</p>
          </div>
          <CardDescription>
            Sistema de Gestão de Usuários e Ativos de TI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@ceap.org.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 rounded-lg bg-card border border-border p-4">
            <p className="text-xs font-semibold text-text-secondary mb-2">
              Usuários de teste:
            </p>
            <div className="space-y-1 text-xs text-text-secondary">
              <p>• juan.carlos@ceap.org.br (Superadmin)</p>
              <p>• maria.santos@ceap.org.br (Admin)</p>
              <p>• ana.rodrigues@ceap.org.br (Analista TI)</p>
              <p className="mt-2 text-[10px]">Senha: qualquer senha (demo)</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              Licenciado para CEAP via AnnILab
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
