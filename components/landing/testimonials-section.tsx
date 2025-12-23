import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "João Pedro Santos",
      role: "Aluno há 3 anos - Jiu-Jitsu",
      text: "Mudou minha vida! Perdi 20kg, ganhei disciplina e autoconfiança. Os professores são incríveis e o ambiente é muito acolhedor.",
      rating: 5,
      image: "👨",
    },
    {
      name: "Maria Eduarda Lima",
      role: "Aluna há 2 anos - Muay Thai",
      text: "Melhor academia que já treinei! Além do treino físico intenso, aprendi muito sobre respeito e determinação. Recomendo demais!",
      rating: 5,
      image: "👩",
    },
    {
      name: "Lucas Oliveira",
      role: "Aluno há 5 anos - Karatê",
      text: "Comecei criança e hoje sou faixa preta. A Panda Dojo não é só uma academia, é uma família. Gratidão eterna aos mestres!",
      rating: 5,
      image: "👦",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">O Que Dizem Nossos Alunos</h2>
          <p className="text-xl text-muted-foreground">
            Histórias reais de transformação
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
