"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cases } from "@/data/cases"
import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"

export function CasesPreview() {
  const featured = cases.filter((c) => c.published).slice(0, 3)

  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="flex items-end justify-between mb-16">
          <div>
            <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Кейсы</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Реализованные проекты
            </h2>
          </div>
          <Link href="/cases" className="hidden sm:flex items-center gap-1.5 text-accent text-sm font-medium hover:underline">
            Все кейсы <ArrowRight size={14} />
          </Link>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((cs) => (
            <StaggerItem key={cs.id}>
              <Link href={`/cases/${cs.slug}`} className="group block glass-panel hover-glow overflow-hidden h-full">
                <div className="h-40 bg-gradient-to-br from-accent/10 to-accent-end/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl border border-accent/20 flex items-center justify-center">
                    <span className="text-accent text-2xl font-bold">{cs.title[0]}</span>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-3 text-xs bg-accent/10 text-accent border-0">
                    {cs.industry}
                  </Badge>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-text-muted text-sm line-clamp-2 mb-4">{cs.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="sm:hidden mt-8 text-center">
          <Link href="/cases" className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1.5">
            Все кейсы <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
