import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface ScheduleSectionProps {
  tenantSlug: string
}

export function ScheduleSection({ tenantSlug }: ScheduleSectionProps) {
  const schedule = [
    { day: "Segunda", classes: [
      { time: "06:00", modality: "Muay Thai", level: "Todos", instructor: "Prof. Carlos" },
      { time: "18:00", modality: "Jiu-Jitsu", level: "Iniciante", instructor: "Prof. Silva" },
      { time: "20:00", modality: "MMA", level: "Avançado", instructor: "Prof. Ramos" },
    ]},
    { day: "Quarta", classes: [
      { time: "06:00", modality: "Karatê", level: "Todos", instructor: "Mestre Tanaka" },
      { time: "18:00", modality: "Jiu-Jitsu", level: "Intermediário", instructor: "Prof. Silva" },
      { time: "20:00", modality: "Muay Thai", level: "Todos", instructor: "Prof. Carlos" },
    ]},
    { day: "Sexta", classes: [
      { time: "06:00", modality: "MMA", level: "Todos", instructor: "Prof. Ramos" },
      { time: "18:00", modality: "Judô", level: "Iniciante", instructor: "Prof. Yamamoto" },
      { time: "20:00", modality: "Jiu-Jitsu", level: "Avançado", instructor: "Prof. Silva" },
    ]},
  ]

  return (
    <section id="horarios" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Grade de Horários</h2>
          <p className="text-xl text-muted-foreground">
            Escolha o melhor horário para treinar
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {schedule.map((day, dayIndex) => (
            <Card key={dayIndex} className="p-6">
              <h3 className="text-2xl font-bold mb-4">{day.day}</h3>
              <div className="space-y-4">
                {day.classes.map((classItem, classIndex) => (
                  <div
                    key={classIndex}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4 mb-2 md:mb-0">
                      <span className="text-2xl font-bold text-orange-600 w-16">
                        {classItem.time}
                      </span>
                      <div>
                        <p className="font-semibold text-lg">{classItem.modality}</p>
                        <p className="text-sm text-muted-foreground">{classItem.instructor}</p>
                      </div>
                    </div>
                    <Badge>{classItem.level}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
