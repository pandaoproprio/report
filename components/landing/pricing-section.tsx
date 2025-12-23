import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Básico",
      price: "R$ 149",
      period: "/mês",
      description: "Perfeito para iniciantes",
      features: [
        "2x por semana",
        "1 modalidade",
        "Acesso à academia",
        "Vestiários e chuveiros",
        "Suporte por WhatsApp",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "R$ 249",
      period: "/mês",
      description: "Mais popular entre os alunos",
      features: [
        "Treinos ilimitados",
        "Todas as modalidades",
        "Aulas especiais",
        "Desconto em eventos",
        "Suporte prioritário",
        "1 aula particular/mês",
      ],
      popular: true,
    },
    {
      name: "Black",
      price: "R$ 399",
      period: "/mês",
      description: "Para atletas dedicados",
      features: [
        "Tudo do Premium",
        "Personal training 2x/semana",
        "Plano de treino personalizado",
        "Acompanhamento nutricional",
        "Acesso a todas as unidades",
        "Eventos gratuitos",
        "Kit de equipamentos",
      ],
      popular: false,
    },
  ]

  return (
    <section id="planos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Planos e Preços
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para seus objetivos. Sem fidelidade, cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? "border-orange-500 border-2 shadow-xl scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-orange-500 hover:bg-orange-600"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Assinar Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            💳 Aceitamos cartão, PIX e boleto • 🎯 Sem taxa de matrícula • 🔄 Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  )
}
