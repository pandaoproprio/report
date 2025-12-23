"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    tenantName: "",
    tenantSubdomain: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validações
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          tenantName: formData.tenantName,
          tenantSubdomain: formData.tenantSubdomain,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta")
      }

      toast.success("Conta criada com sucesso!")

      // Fazer login automático
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.ok) {
        router.push("/admin/onboarding")
        router.refresh()
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = async (provider: "google" | "facebook") => {
    try {
      await signIn(provider, { callbackUrl: "/admin/onboarding" })
    } catch (error) {
      toast.error("Erro ao fazer cadastro")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl">🐼</span>
          </div>
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
          <CardDescription className="text-center">
            Crie sua conta e comece a gerenciar sua academia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@academia.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenantName">Nome da Academia</Label>
              <Input
                id="tenantName"
                placeholder="Academia Dragon"
                value={formData.tenantName}
                onChange={(e) =>
                  setFormData({ ...formData, tenantName: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenantSubdomain">Subdomínio</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tenantSubdomain"
                  placeholder="dragon"
                  value={formData.tenantSubdomain}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                    setFormData({ ...formData, tenantSubdomain: value })
                  }}
                  required
                  disabled={isLoading}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  .pandadojo.com
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Este será o endereço da sua academia
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou cadastre-se com
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialRegister("google")}
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialRegister("facebook")}
              disabled={isLoading}
            >
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </div>
          <div className="text-xs text-center text-muted-foreground">
            Ao criar uma conta, você concorda com nossos{" "}
            <Link href="/terms" className="hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="hover:underline">
              Política de Privacidade
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
