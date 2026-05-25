"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import type { CaseStudy } from "@/types/database"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const industries = ["Сервисные центры", "Клиники", "Рестораны", "E-commerce", "SaaS"]
const technologies = ["WhatsApp API", "OpenAI", "n8n", "Supabase", "Telegram Bot"]

const LEVEL_LABELS: Record<string, { label: string; color: string }> = {
  BASIC: { label: "Basic", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  STANDARD: { label: "Standard", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  ADVANCED: { label: "Advanced", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
}

export function CasesListClient({ cases }: { cases: CaseStudy[] }) {
  const { t } = useLocale()
  const allLabel = t.casesPage.all as string
  const [activeIndustry, setActiveIndustry] = useState<string>(allLabel)
  const [activeTech, setActiveTech] = useState<string>(allLabel)

  const filtered = cases.filter((c) => {
    if (!c.published) return false
    if (activeIndustry !== allLabel && c.industry !== activeIndustry) return false
    if (activeTech !== allLabel && !c.technologies.some((tech) => tech.includes(activeTech))) return false
    return true
  })

  return (
    <>
      {/* Filters */}
      <div className="mb-8 space-y-3">
        <div>
          <p className="text-text-muted text-xs mb-2">{t.casesPage.industry}</p>
          <div className="flex flex-wrap gap-2">
            {[allLabel, ...industries].map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeIndustry === ind
                    ? "accent-gradient text-white"
                    : "bg-surface text-text-muted border border-white/[0.06] hover:border-accent/30"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-text-muted text-xs mb-2">{t.casesPage.technology}</p>
          <div className="flex flex-wrap gap-2">
            {[allLabel, ...technologies].map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTech === tech
                    ? "accent-gradient text-white"
                    : "bg-surface text-text-muted border border-white/[0.06] hover:border-accent/30"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((cs) => {
          const levelInfo = cs.level ? LEVEL_LABELS[cs.level] : null
          return (
            <StaggerItem key={cs.id}>
              <Link href={`/cases/${cs.slug}`} className="group block glass-panel hover-glow overflow-hidden h-full">
                {/* Header — workflow + badges */}
                <div className="px-5 pt-4 pb-3 border-b border-white/[0.04]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {levelInfo && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${levelInfo.color}`}>
                          {levelInfo.label}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-text-muted border border-white/[0.06]">
                        {cs.industry}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-text-muted/30 group-hover:text-accent transition-colors" />
                  </div>

                  {/* Mini workflow */}
                  {cs.workflow && cs.workflow.length > 0 && (
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
                      {cs.workflow.map((step, i) => (
                        <div key={i} className="flex items-center gap-1 shrink-0">
                          <span className="text-[10px] px-2 py-1 rounded-md bg-white/[0.04] text-text-muted border border-white/[0.04]">
                            {step}
                          </span>
                          {i < cs.workflow!.length - 1 && (
                            <ChevronRight size={10} className="text-accent/30 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="px-5 py-4 space-y-4">
                  {/* Title + description */}
                  <div>
                    <h2 className="font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors leading-snug text-[15px]">
                      {cs.title}
                    </h2>
                    <p className="text-text-muted text-xs line-clamp-2 leading-relaxed">{cs.description}</p>
                  </div>

                  {/* Automated features */}
                  {cs.automatedFeatures && cs.automatedFeatures.length > 0 && (
                    <div>
                      <p className="text-text-muted/50 text-[10px] font-medium uppercase tracking-wider mb-2">
                        {t.casesPage.automated}
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {cs.automatedFeatures.map((feat, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <Check size={11} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span className="text-text-secondary text-[11px] leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results — top 2 */}
                  <div>
                    <p className="text-text-muted/50 text-[10px] font-medium uppercase tracking-wider mb-2">
                      {t.casesPage.results}
                    </p>
                    <div className="space-y-1.5">
                      {cs.results.slice(0, 2).map((r, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-text-muted">{r.metric}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-red-400/60 text-[11px] line-through">{r.before}</span>
                            <span className="text-accent/40">→</span>
                            <span className="text-accent font-semibold text-[11px]">{r.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proof metrics */}
                  {cs.proofMetrics && cs.proofMetrics.length > 0 && (
                    <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04]">
                      {cs.proofMetrics.map((pm, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                          <span className="text-text-primary text-[11px] font-semibold tabular-nums">{pm.value}</span>
                          <span className="text-text-muted/50 text-[10px]">{pm.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.03] text-text-muted border border-white/[0.04]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-16">{t.casesPage.noResults}</p>
      )}
    </>
  )
}
