import { Hero } from "@/components/sections/hero"
import { PainPointsSection } from "@/components/sections/pain-points"
import { ServicesPreview } from "@/components/sections/services-preview"
import { ArchitectureShowcase } from "@/components/sections/architecture-showcase"
import { AISystemsShowcase } from "@/components/sections/ai-systems-showcase"
import { CasesPreview } from "@/components/sections/cases-preview"
import { MetricsSection } from "@/components/sections/metrics-section"
import { CTASection } from "@/components/sections/cta-section"
import { ContactFormSection } from "@/components/sections/contact-form"

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPointsSection />
      <ServicesPreview />
      <ArchitectureShowcase />
      <AISystemsShowcase />
      <CasesPreview />
      <MetricsSection />
      <CTASection />
      <ContactFormSection />
    </>
  )
}
