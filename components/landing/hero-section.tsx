"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users, Trophy } from "lucide-react"

interface HeroSectionProps {
  tenantSlug: string
}

export function HeroSection({ tenantSlug }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 pt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="inline-block">
              <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold">
                🥋 Academia de Artes Marciais
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transforme Sua
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Disciplina
              </span>
              em Poder
            </h1>

            <p className="text-xl text-gray-300 max-w-xl">
              Descubra o guerreiro que existe em você. Jiu-Jitsu, Karatê, Muay Thai e muito mais.
              Agende sua aula experimental 100% gratuita hoje mesmo!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${tenantSlug}#agendar`}>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-6">
                  Agendar Aula Grátis
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href={`/${tenantSlug}#eventos`}>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6">
                  Ver Eventos
                  <Calendar className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="flex items-center space-x-2 text-orange-400 mb-1">
                  <Users size={20} />
                  <span className="text-3xl font-bold">500+</span>
                </div>
                <p className="text-gray-400 text-sm">Alunos Ativos</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-orange-400 mb-1">
                  <Trophy size={20} />
                  <span className="text-3xl font-bold">15</span>
                </div>
                <p className="text-gray-400 text-sm">Anos de História</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-orange-400 mb-1">
                  <Calendar size={20} />
                  <span className="text-3xl font-bold">100+</span>
                </div>
                <p className="text-gray-400 text-sm">Eventos/Ano</p>
              </div>
            </div>
          </div>

          {/* Image/Video Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-orange-500/20 to-slate-800/20 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <span className="text-9xl">🥋</span>
                <p className="text-white mt-4 text-lg">
                  Vídeo de treinos e eventos
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  (Placeholder - adicionar vídeo background)
                </p>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-bold">4.9/5</div>
                  <div className="text-xs text-gray-500">200+ avaliações</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="font-bold">50+ Campeões</div>
                  <div className="text-xs text-gray-500">Competições nacionais</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}
