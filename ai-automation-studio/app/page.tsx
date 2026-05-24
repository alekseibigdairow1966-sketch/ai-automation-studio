import { Hero } from "@/components/sections/hero"
import { PainPointsSection } from "@/components/sections/pain-points"
import { ServicesPreview } from "@/components/sections/services-preview"
import { ArchitectureShowcase } from "@/components/sections/architecture-showcase"
import { AISystemsShowcase } from "@/components/sections/ai-systems-showcase"
import { InteractiveDemos } from "@/components/sections/interactive-demos"
import { OperationalDashboard } from "@/components/sections/operational-dashboard"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { CasesPreview } from "@/components/sections/cases-preview"
import { IntegrationEcosystem } from "@/components/sections/integration-ecosystem"
import { TrustSection } from "@/components/sections/trust-section"
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
      <InteractiveDemos />
      <OperationalDashboard />
      <ROICalculator />
      <CasesPreview />
      <IntegrationEcosystem />
      <TrustSection />
      <MetricsSection />
      <CTASection />
      <ContactFormSection />
    </>
  )
}
