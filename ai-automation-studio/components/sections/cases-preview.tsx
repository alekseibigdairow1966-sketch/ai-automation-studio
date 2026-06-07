"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cases } from "@/data/cases"
import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"

/* ── Mini Operational Preview ── */

function CRMPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center px-5 py-3">
      <div className="w-full max-w-[240px] bg-[#08080d] border border-white/10 rounded-lg overflow-hidden text-left shadow-lg">
        <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-text-primary font-medium">Repair Queue</span>
          </div>
          <span className="text-[8px] text-text-muted">3 active · SLA 92%</span>
        </div>
        {[
          { id: "#4821", device: "Galaxy S25 Ultra", status: "Repair", color: "bg-accent/15 text-accent border-accent/20" },
          { id: "#4820", device: "Samsung S22", status: "Awaiting diag.", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
          { id: "#4819", device: "Acer Nitro V15", status: "Parts wait", color: "bg-neutral-500/15 text-neutral-400 border-neutral-500/20" },
        ].map((row, i, arr) => (
          <div
            key={row.id}
            className={`px-3 py-2 flex items-center justify-between ${
              i < arr.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-text-muted font-mono">{row.id}</span>
              <span className="text-[9px] text-text-secondary">{row.device}</span>
            </div>
            <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded border ${row.color}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PREVIEW_MAP: Record<string, React.ReactNode> = {
  "crm-automation-service-center": <CRMPreview />,
}

/* ── Scenario Preview Section (service center focus) ── */

export function CasesPreview() {
  const published = cases.filter((c) => c.published)
  const featured = published.filter((c) => c.slug === "crm-automation-service-center")

  if (featured.length === 0) return null

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">Сценарий внедрения</p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-3">
            Как это работает в сервисном центре
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Операционный сценарий автоматизации — от приёма заявки до закрытия ремонта. Готовы развернуть под ваш процесс.
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {featured.map((cs) => (
            <StaggerItem key={cs.id}>
              <Link href={`/cases/${cs.slug}`} className="group block glass-panel hover-glow overflow-hidden h-full">
                {/* Mini operational preview */}
                <div className="h-40 bg-gradient-to-br from-white/[0.02] to-white/[0.005] relative overflow-hidden">
                  {PREVIEW_MAP[cs.slug] ?? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl border border-accent/20 flex items-center justify-center">
                        <span className="text-accent text-2xl font-bold">{cs.title[0]}</span>
                      </div>
                    </div>
                  )}
                  {/* Subtle grid overlay */}
                  <div className="absolute inset-0 hero-grid opacity-[0.02] pointer-events-none" />
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-3 text-xs bg-accent/10 text-accent border-0">
                    {cs.industry}
                  </Badge>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-text-muted text-sm line-clamp-2 mb-4">Сценарий: {cs.description}</p>
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

        <div className="mt-8 text-center">
          <Link
            href="/cases/crm-automation-service-center"
            className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1.5"
          >
            Открыть сценарий <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
