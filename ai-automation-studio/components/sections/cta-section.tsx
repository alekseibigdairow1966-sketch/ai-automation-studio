"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"
import { LeadCaptureModal } from "@/components/lead-capture-modal"
import { useLocale } from "@/lib/i18n"

export interface CTAContent {
  title: string
  subtitle: string
  buttonText: string
}

export function CTASection({ content }: { content?: CTAContent }) {
  const { t } = useLocale()
  const [modalOpen, setModalOpen] = useState(false)

  const c = content ?? {
    title: t.cta.title,
    subtitle: t.cta.subtitle,
    buttonText: t.cta.button,
  }

  return (
    <>
      <section className="py-14 md:py-16 px-6 lg:px-8">
        <MotionWrapper>
          <div className="max-w-4xl mx-auto relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-accent/10 via-accent-end/5 to-transparent rounded-2xl blur-xl opacity-40" />

            {/* Card */}
            <div className="relative bg-[#08080d] border border-white/10 rounded-2xl p-8 sm:p-12 text-center overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-accent-end/[0.03]" />
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              {/* Bottom subtle glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-accent-end/20 to-transparent" />

              <div className="relative">
                <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-3">
                  {c.title}
                </h2>
                <p className="text-text-muted text-base mb-8 max-w-lg mx-auto leading-relaxed">
                  {c.subtitle}
                </p>
                <Button
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  className="accent-gradient text-white font-medium px-8 hover:opacity-90 transition-opacity"
                >
                  {c.buttonText}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </section>

      <LeadCaptureModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
