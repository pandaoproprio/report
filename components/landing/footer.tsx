import Link from "next/link"

interface FooterProps {
  tenantSlug: string
}

export function Footer({ tenantSlug }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🐼</span>
              <span className="text-xl font-bold">Panda Dojo</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transformando vidas através das artes marciais desde 2010.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href={`/${tenantSlug}#modalidades`} className="hover:text-white">Modalidades</a></li>
              <li><a href={`/${tenantSlug}#eventos`} className="hover:text-white">Eventos</a></li>
              <li><a href={`/${tenantSlug}#horarios`} className="hover:text-white">Horários</a></li>
              <li><a href={`/${tenantSlug}#planos`} className="hover:text-white">Planos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📍 Rua das Academias, 123</li>
              <li>📞 (11) 99999-9999</li>
              <li>📧 contato@pandadojo.com</li>
              <li>🕐 Seg-Sex: 6h-22h | Sáb: 8h-14h</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-orange-500">📘</a>
              <a href="#" className="hover:text-orange-500">📷</a>
              <a href="#" className="hover:text-orange-500">▶️</a>
              <a href="#" className="hover:text-orange-500">💬</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Panda Dojo. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvido por <span className="text-orange-500 font-semibold">AnnITech - IT Solutions</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
