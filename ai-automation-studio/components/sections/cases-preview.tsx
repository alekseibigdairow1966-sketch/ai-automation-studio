"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cases } from "@/data/cases"
import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"

/* ── Mini Operational Previews ── */

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

function ReceptionPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center px-5 py-3">
      <div className="w-full max-w-[240px] space-y-2">
        {/* Incoming message */}
        <div className="bg-white/[0.05] border border-white/5 rounded-lg rounded-bl-sm px-3 py-2 max-w-[200px]">
          <p className="text-[9px] text-text-secondary leading-snug">
            Здравствуйте, хочу записаться на чистку зубов
          </p>
          <p className="text-[8px] text-text-muted/80 text-right mt-1">10:24</p>
        </div>
        {/* Bot reply */}
        <div className="bg-accent/[0.08] border border-accent/10 rounded-lg rounded-br-sm px-3 py-2 max-w-[220px] ml-auto">
          <p className="text-[9px] text-text-secondary leading-snug">
            Записала вас на 15 мая, 14:00. Подтверждение отправлено.
          </p>
          <p className="text-[8px] text-accent/50 text-right mt-1">AI · 10:24</p>
        </div>
      </div>
    </div>
  )
}

function RestaurantPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center px-5 py-3">
      <div className="w-full max-w-[220px] bg-[#08080d] border border-white/10 rounded-lg overflow-hidden text-left shadow-lg">
        <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
          <span className="text-[9px] text-text-primary font-medium">Order #847</span>
          <span className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            Confirmed
          </span>
        </div>
        <div className="px-3 py-2 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[9px] text-text-muted">Плов x2</span>
            <span className="text-[9px] text-text-secondary tabular-nums">3 400 ₸</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] text-text-muted">Лагман x1</span>
            <span className="text-[9px] text-text-secondary tabular-nums">2 100 ₸</span>
          </div>
          <div className="border-t border-white/5 pt-1.5 flex justify-between">
            <span className="text-[9px] text-text-primary font-medium">Итого</span>
            <span className="text-[9px] text-text-primary font-semibold tabular-nums">8 900 ₸</span>
          </div>
        </div>
        <div className="px-3 py-1.5 border-t border-white/5 bg-white/[0.015]">
          <span className="text-[8px] text-text-muted flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            POS synced
          </span>
        </div>
      </div>
    </div>
  )
}

const PREVIEW_MAP: Record<string, React.ReactNode> = {
  "crm-automation-service-center": <CRMPreview />,
  "ai-reception-dental-clinic": <ReceptionPreview />,
  "restaurant-whatsapp-orders": <RestaurantPreview />,
}

/* ── Cases Preview Section ── */

export function CasesPreview() {
  const priorityOrder = ["crm-automation-service-center", "ai-reception-dental-clinic", "restaurant-whatsapp-orders"]
  const published = cases.filter((c) => c.published)
  const featured = priorityOrder
    .map((slug) => published.find((c) => c.slug === slug))
    .filter(Boolean) as typeof cases

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">Кейсы</p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary">
              Реализованные проекты
            </h2>
          </div>
          <Link href="/cases" className="hidden sm:flex items-center gap-1.5 text-accent text-sm font-medium hover:underline">
            Все кейсы <ArrowRight size={14} />
          </Link>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
