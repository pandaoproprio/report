import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Calendar, TrendingUp, UserCheck, AlertCircle } from "lucide-react"

export default async function AdminDashboard() {
  // TODO: Fetch real data from database

  const stats = {
    totalStudents: 156,
    activeStudents: 142,
    monthlyRevenue: 35400,
    upcomingEvents: 8,
    newStudents: 12,
    overduePay ments: 8,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da sua academia
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeStudents} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {stats.monthlyRevenue.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Alunos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newStudents}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas ações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <UserCheck className="mr-4 h-8 w-8 text-green-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">João Silva se matriculou</p>
                  <p className="text-sm text-muted-foreground">
                    Plano Premium - Jiu-Jitsu
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  Há 2 horas
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-4 h-8 w-8 text-orange-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Novo evento criado</p>
                  <p className="text-sm text-muted-foreground">
                    Campeonato Interno - 15/02
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  Há 4 horas
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-4 h-8 w-8 text-blue-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Pagamento recebido</p>
                  <p className="text-sm text-muted-foreground">
                    Maria Santos - R$ 249,00
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  Há 6 horas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>
              Itens que requerem atenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <AlertCircle className="mr-4 h-8 w-8 text-red-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {stats.overduePayments} pagamentos atrasados
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Requer ação
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-4 h-8 w-8 text-yellow-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    5 leads sem follow-up
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Últimas 48h
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-4 h-8 w-8 text-blue-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    3 alunos inativos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sem frequência há 15+ dias
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
