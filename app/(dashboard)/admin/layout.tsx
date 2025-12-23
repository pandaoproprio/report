import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Settings,
  UserPlus,
  TrendingUp,
  LogOut
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <span className="text-3xl">🐼</span>
            <div>
              <div className="text-xl font-bold">Panda Dojo</div>
              <div className="text-xs text-gray-400">Admin</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/students">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <Users className="mr-2 h-4 w-4" />
                Alunos
              </Button>
            </Link>
            <Link href="/admin/leads">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <UserPlus className="mr-2 h-4 w-4" />
                Leads
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <Calendar className="mr-2 h-4 w-4" />
                Eventos
              </Button>
            </Link>
            <Link href="/admin/finances">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <DollarSign className="mr-2 h-4 w-4" />
                Financeiro
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <TrendingUp className="mr-2 h-4 w-4" />
                Relatórios
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-400">admin@pandadojo.com</div>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50">
        {children}
      </main>
    </div>
  )
}
