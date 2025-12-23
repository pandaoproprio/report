import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MODALITIES } from "@/lib/constants"

export function ModalitiesSection() {
  return (
    <section id="modalidades" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Modalidades Oferecidas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha a arte marcial que mais combina com você e seus objetivos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODALITIES.map((modality, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">{modality.icon}</div>
                <CardTitle>{modality.name}</CardTitle>
                <CardDescription>{modality.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
