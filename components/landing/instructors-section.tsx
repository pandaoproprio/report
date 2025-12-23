import { Card, CardContent } from "@/components/ui/card"

interface InstructorsSectionProps {
  tenantSlug: string
}

export function InstructorsSection({ tenantSlug }: InstructorsSectionProps) {
  const instructors = [
    {
      name: "Mestre Carlos Silva",
      role: "Faixa Preta 4º Dan - Jiu-Jitsu",
      experience: "25 anos de experiência",
      specialties: "Competição, Defesa Pessoal",
      image: "🥋",
    },
    {
      name: "Prof. Takeshi Nakamura",
      role: "6º Dan - Karatê Shotokan",
      experience: "30 anos de experiência",
      specialties: "Kata, Kumite",
      image: "🥊",
    },
    {
      name: "Prof. André Ramos",
      role: "Campeão Nacional - Muay Thai",
      experience: "15 anos de experiência",
      specialties: "Competição, Condicionamento",
      image: "🥊",
    },
    {
      name: "Profa. Marina Costa",
      role: "Faixa Preta - Taekwondo",
      experience: "12 anos de experiência",
      specialties: "Infantil, Feminino",
      image: "🥋",
    },
  ]

  return (
    <section id="instrutores" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nossos Mestres</h2>
          <p className="text-xl text-muted-foreground">
            Aprenda com os melhores profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-5xl">
                  {instructor.image}
                </div>
                <h3 className="text-xl font-bold mb-2">{instructor.name}</h3>
                <p className="text-sm text-orange-600 mb-2">{instructor.role}</p>
                <p className="text-sm text-muted-foreground mb-2">{instructor.experience}</p>
                <p className="text-xs text-muted-foreground">{instructor.specialties}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
