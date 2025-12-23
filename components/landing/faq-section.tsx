"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Preciso ter experiência prévia?",
      answer: "Não! Aceitamos alunos de todos os níveis, desde iniciantes até avançados. Nossas turmas são divididas por nível para garantir o melhor aproveitamento.",
    },
    {
      question: "Qual é a idade mínima para treinar?",
      answer: "Oferecemos turmas a partir de 4 anos de idade. Temos programas especiais para crianças, adolescentes e adultos.",
    },
    {
      question: "Preciso assinar contrato de fidelidade?",
      answer: "Não! Você pode cancelar sua mensalidade quando quiser, sem multas ou taxas. Queremos que você treine porque ama, não por obrigação.",
    },
    {
      question: "Como funciona a aula experimental?",
      answer: "Você agenda online, comparece no dia e horário marcado e participa de uma aula completa gratuitamente. Não precisa trazer nada, temos kimono e equipamentos disponíveis.",
    },
    {
      question: "Qual é a política de faltas?",
      answer: "Com o plano Premium, você tem treinos ilimitados e pode repor aulas quando necessário. Basta avisar a recepção.",
    },
    {
      question: "Vocês participam de campeonatos?",
      answer: "Sim! Organizamos campeonatos internos e participamos de competições regionais e nacionais. A participação é opcional.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre a academia
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
