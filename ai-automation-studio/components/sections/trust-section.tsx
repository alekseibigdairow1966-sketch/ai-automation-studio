"use client"

import Image from "next/image"
import { Wrench, Cpu } from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const ICONS = [Wrench, Cpu]

export function TrustSection() {
  const { locale, t } = useLocale()

  const founderName = "Алексей"
  const founderRole = locale === "kk" ? "Негізін қалаушы, ServiceLayer" : "Основатель ServiceLayer"
  const founderQuote = locale === "kk"
    ? "Біз сервис орталықтарының нақты ауыртпалығын білеміз — сондықтан біздің шешімдер жұмыс істейді"
    : "Мы знаем реальную боль сервисных центров — поэтому наши решения работают"

  /* Only first 2 trust items — compact credibility */
  const items = t.trust.items.slice(0, 2)

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {items.map((point, i) => {
            const Icon = ICONS[i] ?? Wrench
            return (
              <StaggerItem key={i}>
                <div className="border border-white/[0.06] rounded-xl p-5 sm:p-6 bg-surface/30">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary text-sm mb-1">{point.title}</h3>
                      <p className="text-text-muted text-xs leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Founder — compact inline */}
        <MotionWrapper delay={0.3}>
          <div className="flex items-center gap-4 justify-center">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-accent/20 shrink-0">
              <Image
                src="/avatar.png"
                alt={founderName}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-text-secondary text-sm italic leading-snug">
                &ldquo;{founderQuote}&rdquo;
              </p>
              <p className="text-text-muted text-xs mt-1">
                {founderName}, {founderRole}
              </p>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
