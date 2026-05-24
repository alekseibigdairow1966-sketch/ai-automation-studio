"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cases } from "@/data/cases"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const industries = ["Все", "Клиники", "Рестораны", "E-commerce", "Услуги", "SaaS"]
const technologies = ["Все", "WhatsApp API", "OpenAI", "n8n", "CRM", "Supabase"]

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
      <div className="mb-8 space-y-4">
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
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((cs) => (
          <StaggerItem key={cs.id}>
            <Link href={`/cases/${cs.slug}`} className="group block glass-panel hover-glow overflow-hidden h-full">
              <div className="h-36 bg-gradient-to-br from-accent/10 to-accent-end/10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-xl border border-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xl font-bold">{cs.title[0]}</span>
                </div>
              </div>
              <div className="p-5">
                <Badge variant="secondary" className="mb-2 text-xs bg-accent/10 text-accent border-0">
                  {cs.industry}
                </Badge>
                <h2 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {cs.title}
                </h2>
                <p className="text-text-muted text-sm line-clamp-2 mb-4">{cs.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.technologies.map((tech) => (
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

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-16">Нет кейсов по выбранным фильтрам</p>
      )}
    </>
  )
}
