import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CTASectionProps {
  tenantSlug: string
}

export function CTASection({ tenantSlug }: CTASectionProps) {
  return (
    <section id="agendar" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            Pronto Para Começar Sua Jornada?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Agende sua aula experimental 100% gratuita agora mesmo.
            Sem compromisso, sem cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${tenantSlug}/trial-booking`}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-6">
                Agendar Aula Grátis
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20academia`}>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6">
                Falar no WhatsApp
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-orange-400">100%</p>
              <p className="text-gray-400">Grátis</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-400">0</p>
              <p className="text-gray-400">Compromisso</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-400">∞</p>
              <p className="text-gray-400">Benefícios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
