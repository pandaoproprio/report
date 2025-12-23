import { HeroSection } from "@/components/landing/hero-section"
import { ModalitiesSection } from "@/components/landing/modalities-section"
import { EventsSection } from "@/components/landing/events-section"
import { ScheduleSection } from "@/components/landing/schedule-section"
import { InstructorsSection } from "@/components/landing/instructors-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FAQSection } from "@/components/landing/faq-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

interface LandingPageProps {
  params: {
    tenant: string
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  // TODO: Buscar dados do tenant
  const { tenant } = params

  return (
    <div className="min-h-screen bg-background">
      <Navbar tenantSlug={tenant} />

      <main>
        <HeroSection tenantSlug={tenant} />
        <ModalitiesSection />
        <EventsSection tenantSlug={tenant} />
        <ScheduleSection tenantSlug={tenant} />
        <InstructorsSection tenantSlug={tenant} />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection tenantSlug={tenant} />
      </main>

      <Footer tenantSlug={tenant} />
    </div>
  )
}
