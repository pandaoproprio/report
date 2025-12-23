import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/shared/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Panda Dojo - Sistema de Gestão para Academias",
  description: "Sistema SaaS multitenant completo para gestão de academias de artes marciais",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
