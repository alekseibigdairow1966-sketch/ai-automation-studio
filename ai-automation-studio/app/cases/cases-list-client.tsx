"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cases } from "@/data/cases"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const industries = ["Все", "Сервисные центры", "Клиники", "Рестораны", "E-commerce", "SaaS"]
const technologies = ["Все", "WhatsApp API", "OpenAI", "n8n", "Supabase", "Telegram Bot"]

export function CasesListClient() {
  const [activeIndustry, setActiveIndustry] = useState("Все")
  const [activeTech, setActiveTech] = useState("Все")

  const filtered = cases.filter((c) => {
    if (!c.published) return false
    if (activeIndustry !== "Все" && c.industry !== activeIndustry) return false
    if (activeTech !== "Все" && !c.technologies.some((t) => t.includes(activeTech))) return false
    return true
  })

  return (
    <>
      {/* Filters */}
      <div className="mb-10 space-y-4">
        <div>
          <p className="text-text-muted text-xs mb-2">Индустрия</p>
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
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
          <p className="text-text-muted text-xs mb-2">Технология</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
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
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cs) => {
          const topResult = cs.results[0]
          return (
            <StaggerItem key={cs.id}>
              <Link href={`/cases/${cs.slug}`} className="group block glass-panel hover-glow overflow-hidden h-full">
                {/* Visual header */}
                <div className="h-44 bg-gradient-to-br from-accent/10 via-accent/5 to-accent-end/10 relative p-5 flex flex-col justify-between">
                  {/* Industry badge */}
                  <Badge variant="secondary" className="self-start text-[10px] bg-white/10 text-white/80 border-0 backdrop-blur-sm">
                    {cs.industry}
                  </Badge>
                  {/* Key metric */}
                  {topResult && (
                    <div className="self-end">
                      <div className="bg-background/60 backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-2.5">
                        <p className="text-text-muted text-[10px] mb-0.5">{topResult.metric}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400/70 text-xs line-through">{topResult.before}</span>
                          <ArrowRight size={10} className="text-text-muted" />
                          <span className="text-accent font-bold text-sm">{topResult.after}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors leading-snug">
                    {cs.title}
                  </h2>
                  <p className="text-text-muted text-sm line-clamp-2 mb-4 leading-relaxed">{cs.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted border border-white/[0.04]">
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
        <p className="text-center text-text-muted py-16">Нет кейсов по выбранным фильтрам</p>
      )}
    </>
  )
}
