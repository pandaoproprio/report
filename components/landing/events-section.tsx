import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"

interface EventsSectionProps {
  tenantSlug: string
}

export function EventsSection({ tenantSlug }: EventsSectionProps) {
  const upcomingEvents = [
    {
      id: 1,
      title: "Campeonato Interno de Jiu-Jitsu",
      type: "Campeonato",
      date: "2025-02-15",
      time: "09:00",
      location: "Academia Principal",
      participants: 45,
      spotsLeft: 5,
      price: "R$ 50,00",
      image: "🏆",
    },
    {
      id: 2,
      title: "Workshop com Mestre Nakamura",
      type: "Workshop",
      date: "2025-02-20",
      time: "15:00",
      location: "Dojo 1",
      participants: 28,
      spotsLeft: 12,
      price: "R$ 80,00",
      image: "🥋",
    },
    {
      id: 3,
      title: "Exame de Graduação - Karatê",
      type: "Exame de Faixa",
      date: "2025-03-01",
      time: "18:00",
      location: "Academia Principal",
      participants: 35,
      spotsLeft: 0,
      price: "R$ 120,00",
      image: "🥊",
    },
  ]

  return (
    <section id="eventos" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Próximos Eventos</Badge>
          <h2 className="text-4xl font-bold mb-4">
            Eventos e Campeonatos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Participe dos nossos eventos, workshops e competições
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-center">
                <span className="text-7xl">{event.image}</span>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{event.type}</Badge>
                  {event.spotsLeft === 0 ? (
                    <Badge variant="destructive">Esgotado</Badge>
                  ) : (
                    <Badge className="bg-green-500">{event.spotsLeft} vagas</Badge>
                  )}
                </div>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      {event.participants} inscritos
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    {event.price}
                  </span>
                  <Button disabled={event.spotsLeft === 0}>
                    {event.spotsLeft === 0 ? "Esgotado" : "Inscrever-se"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Ver Todos os Eventos
          </Button>
        </div>
      </div>
    </section>
  )
}
