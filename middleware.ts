import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  // Rotas públicas (landing page, eventos públicos, etc.)
  const isPublicRoute =
    pathname.startsWith("/api/public") ||
    pathname === "/" ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/schedule") ||
    pathname.startsWith("/trial-booking") ||
    pathname === "/login" ||
    pathname === "/register"

  // Rotas de autenticação
  const isAuthRoute = pathname === "/login" || pathname === "/register"

  // API routes de autenticação
  const isAuthApiRoute = pathname.startsWith("/api/auth")

  // Redirecionar usuários logados para dashboard se tentarem acessar login/register
  if (isLoggedIn && isAuthRoute) {
    const dashboardUrl = getDashboardUrl(userRole!)
    return NextResponse.redirect(new URL(dashboardUrl, req.url))
  }

  // Permitir rotas públicas e de auth
  if (isPublicRoute || isAuthApiRoute) {
    return NextResponse.next()
  }

  // Redirecionar para login se não estiver autenticado
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // RBAC - Verificar permissões por rota
  const hasAccess = checkRouteAccess(pathname, userRole!)

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  return NextResponse.next()
})

function getDashboardUrl(role: string): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "/admin/super"
    case "ADMIN":
      return "/admin/dashboard"
    case "INSTRUCTOR":
      return "/instructor/dashboard"
    case "RECEPTIONIST":
      return "/reception/dashboard"
    case "STUDENT":
      return "/student/dashboard"
    case "GUARDIAN":
      return "/guardian/dashboard"
    default:
      return "/"
  }
}

function checkRouteAccess(pathname: string, role: string): boolean {
  // Super Admin tem acesso a tudo
  if (role === "SUPER_ADMIN") return true

  // Admin da academia
  if (role === "ADMIN") {
    return pathname.startsWith("/admin") || pathname.startsWith("/api/admin")
  }

  // Instrutor
  if (role === "INSTRUCTOR") {
    return (
      pathname.startsWith("/instructor") ||
      pathname.startsWith("/api/instructor") ||
      pathname.startsWith("/student") // Pode ver alunos
    )
  }

  // Recepcionista
  if (role === "RECEPTIONIST") {
    return (
      pathname.startsWith("/reception") ||
      pathname.startsWith("/api/reception")
    )
  }

  // Aluno
  if (role === "STUDENT") {
    return (
      pathname.startsWith("/student") ||
      pathname.startsWith("/api/student")
    )
  }

  // Responsável
  if (role === "GUARDIAN") {
    return (
      pathname.startsWith("/guardian") ||
      pathname.startsWith("/api/guardian")
    )
  }

  return false
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
