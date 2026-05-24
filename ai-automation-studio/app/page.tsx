import { Hero } from "@/components/sections/hero"
import { ServicesPreview } from "@/components/sections/services-preview"
import { CasesPreview } from "@/components/sections/cases-preview"
import { ArchitectureShowcase } from "@/components/sections/architecture-showcase"
import { TechStack } from "@/components/sections/tech-stack"
import { AISystemsShowcase } from "@/components/sections/ai-systems-showcase"
import { AIConsultantSection } from "@/components/sections/ai-consultant-section"
import { MetricsSection } from "@/components/sections/metrics-section"
import { CTASection } from "@/components/sections/cta-section"
import { ContactFormSection } from "@/components/sections/contact-form"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <CasesPreview />
      <ArchitectureShowcase />
      <TechStack />
      <AISystemsShowcase />
      <AIConsultantSection />
      <MetricsSection />
      <CTASection />
      <ContactFormSection />
    </>
  )
}
