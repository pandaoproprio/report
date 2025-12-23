"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  tenantSlug: string
}

export function Navbar({ tenantSlug }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Início", href: `/${tenantSlug}` },
    { name: "Modalidades", href: `/${tenantSlug}#modalidades` },
    { name: "Eventos", href: `/${tenantSlug}#eventos` },
    { name: "Horários", href: `/${tenantSlug}#horarios` },
    { name: "Instrutores", href: `/${tenantSlug}#instrutores` },
    { name: "Planos", href: `/${tenantSlug}#planos` },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${tenantSlug}`} className="flex items-center space-x-2">
            <span className="text-3xl">🐼</span>
            <span className="text-xl font-bold text-white">Panda Dojo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white">
                Login
              </Button>
            </Link>
            <Link href={`/${tenantSlug}#agendar`}>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Aula Grátis
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full text-white">
                  Login
                </Button>
              </Link>
              <Link href={`/${tenantSlug}#agendar`} className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Aula Grátis
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
