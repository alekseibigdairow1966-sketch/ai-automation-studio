"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import type { CaseStudy } from "@/types/database"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const industries = ["Сервисные центры", "Клиники", "Рестораны", "E-commerce", "SaaS"]
const technologies = ["WhatsApp API", "OpenAI", "n8n", "Supabase", "Telegram Bot"]

const LEVEL_META: Record<string, { label: string; color: string; order: number }> = {
  ADVANCED: { label: "Advanced", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", order: 0 },
  STANDARD: { label: "Standard", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", order: 1 },
  BASIC: { label: "Basic", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", order: 2 },
}

/* Live events mapped by case id */
const LIVE_EVENTS: Record<string, string[]> = {
  "1": [
    "AI определил: «Консультация терапевта»",
    "Запись создана → слот 15:30 забронирован",
    "Пациент получил подтверждение в WhatsApp",
  ],
  "2": [
    "Заказ #1247 получен через WhatsApp",
    "POS обновлена → заказ в очереди на кухне",
    "Клиент получил подтверждение: 25 мин",
  ],
  "3": [
    "AI ответил: статус заказа #78412 — доставка",
    "Запрос о возврате → эскалация оператору",
    "Проверка наличия: iPhone 15 Pro — в наличии",
  ],
  "4": [
    "Заявка #4821 автоматически создана из WhatsApp",
    "AI классифицировал: «Замена дисплея iPhone 14»",
    "Telegram уведомление отправлено мастеру Алексей К.",
    "Статус обновлён → клиент уведомлён автоматически",
  ],
  "5": [
    "AI ответил на тикет #3892 за 18 сек (RAG)",
    "Эскалация тикета #3895 → оператору с контекстом",
    "База знаний обновлена: +3 новых FAQ",
  ],
}

/* ------------------------------------------------------------------ */
/*  Mini UI Preview Components                                         */
/* ------------------------------------------------------------------ */

function CRMDashboardPreview() {
  return (
    <div className="bg-white/[0.02] rounded-lg p-3 space-y-2 text-[10px]">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Заявки", value: "47", color: "text-text-primary" },
          { label: "В работе", value: "12", color: "text-amber-400" },
          { label: "Готово", value: "31", color: "text-emerald-400" },
        ].map((s, i) => (
          <div key={i} className="bg-white/[0.03] rounded px-2 py-1.5 text-center">
            <p className="text-text-muted/70">{s.label}</p>
            <p className={`text-sm font-bold tabular-nums ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      {[
        { id: "#4821", type: "Замена дисплея", st: "В работе", stColor: "text-amber-400" },
        { id: "#4820", type: "Диагностика", st: "Готово", stColor: "text-emerald-400" },
        { id: "#4819", type: "Замена батареи", st: "Новая", stColor: "text-blue-400" },
      ].map((r, i) => (
        <div key={i} className="flex items-center justify-between px-1 py-0.5">
          <div className="flex items-center gap-2">
            <span className="text-accent tabular-nums">{r.id}</span>
            <span className="text-text-muted">{r.type}</span>
          </div>
          <span className={r.stColor}>{r.st}</span>
        </div>
      ))}
      <div className="bg-white/[0.03] rounded px-2 py-1.5">
        <div className="flex justify-between mb-1">
          <span className="text-text-muted/70">Закрыто</span>
          <span className="text-text-primary font-semibold">74%</span>
        </div>
        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: "74%" }} />
        </div>
      </div>
    </div>
  )
}

function WhatsAppPreview() {
  return (
    <div className="bg-white/[0.02] rounded-lg p-3 space-y-2 text-[11px]">
      <div className="flex items-center gap-2 pb-1.5 border-b border-white/[0.04]">
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px] text-emerald-400">AI</div>
        <span className="text-text-primary text-[10px] font-medium">AI Assistant</span>
        <span className="text-emerald-400 text-[8px]">online</span>
      </div>
      <div className="flex justify-end">
        <div className="bg-accent/15 rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[85%] text-text-secondary">
          Запись к терапевту на завтра
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white/[0.04] rounded-lg rounded-bl-sm px-2.5 py-1.5 max-w-[85%] text-text-muted">
          Свободно: 10:00, 14:30, 16:00. Какое время удобно?
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-accent/15 rounded-lg rounded-br-sm px-2.5 py-1.5 text-text-secondary">14:30</div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white/[0.04] rounded-lg rounded-bl-sm px-2.5 py-1.5 max-w-[85%] text-text-muted">
          ✅ Запись создана на 14:30. Напоминание придёт за 2 часа.
        </div>
      </div>
    </div>
  )
}

function OrderPreview() {
  return (
    <div className="bg-white/[0.02] rounded-lg p-3 space-y-2 text-[10px]">
      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
        <span className="text-text-primary text-[11px] font-medium">Заказ #1247</span>
        <span className="text-emerald-400">Подтверждён</span>
      </div>
      {["Бургер классический ×2", "Картофель фри ×1", "Кола 0.5л ×2"].map((item, i) => (
        <div key={i} className="flex items-center justify-between px-1 text-text-muted">
          <span>{item}</span>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.04] text-[11px]">
        <span className="text-text-muted">Итого</span>
        <span className="text-text-primary font-semibold">4 200 ₸</span>
      </div>
      <div className="bg-white/[0.03] rounded px-2 py-1.5 text-text-muted text-center">
        Готовность: ~25 мин → POS обновлена
      </div>
    </div>
  )
}

function ChatWidgetPreview() {
  return (
    <div className="bg-white/[0.02] rounded-lg p-3 space-y-2 text-[11px]">
      <div className="flex items-center gap-2 pb-1.5 border-b border-white/[0.04]">
        <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center text-[8px] text-violet-400">AI</div>
        <span className="text-text-primary text-[10px] font-medium">Поддержка</span>
      </div>
      <div className="flex justify-end">
        <div className="bg-accent/15 rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[85%] text-text-secondary">
          Где мой заказ #78412?
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white/[0.04] rounded-lg rounded-bl-sm px-2.5 py-1.5 max-w-[85%] text-text-muted">
          Заказ #78412 отправлен. Трек: KZ2847291. Доставка завтра до 18:00.
        </div>
      </div>
      <div className="text-[9px] text-emerald-400/60 text-center">AI ответил за 3 сек</div>
    </div>
  )
}

function SupportTicketsPreview() {
  return (
    <div className="bg-white/[0.02] rounded-lg p-3 space-y-1.5 text-[10px]">
      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
        <span className="text-text-muted/70 uppercase tracking-wider">Тикеты</span>
        <span className="text-emerald-400">70% AI</span>
      </div>
      {[
        { id: "#3892", q: "Как настроить API?", st: "AI решён", stColor: "text-emerald-400" },
        { id: "#3895", q: "Баг в отчётах", st: "Эскалация", stColor: "text-amber-400" },
        { id: "#3891", q: "Лимиты тарифа", st: "AI решён", stColor: "text-emerald-400" },
      ].map((t, i) => (
        <div key={i} className="flex items-center justify-between px-0.5 py-1">
          <div className="flex items-center gap-2">
            <span className="text-accent tabular-nums">{t.id}</span>
            <span className="text-text-muted truncate max-w-[120px]">{t.q}</span>
          </div>
          <span className={`${t.stColor} shrink-0`}>{t.st}</span>
        </div>
      ))}
    </div>
  )
}

const PREVIEW_BY_ID: Record<string, () => React.JSX.Element> = {
  "1": WhatsAppPreview,
  "2": OrderPreview,
  "3": ChatWidgetPreview,
  "4": CRMDashboardPreview,
  "5": SupportTicketsPreview,
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function CasesListClient({ cases }: { cases: CaseStudy[] }) {
  const { t } = useLocale()
  const allLabel = t.casesPage.all as string
  const [activeIndustry, setActiveIndustry] = useState<string>(allLabel)
  const [activeTech, setActiveTech] = useState<string>(allLabel)

  const filtered = cases
    .filter((c) => {
      if (!c.published) return false
      if (activeIndustry !== allLabel && c.industry !== activeIndustry) return false
      if (activeTech !== allLabel && !c.technologies.some((tech) => tech.includes(activeTech))) return false
      return true
    })
    .sort((a, b) => {
      const oa = LEVEL_META[a.level ?? "STANDARD"]?.order ?? 1
      const ob = LEVEL_META[b.level ?? "STANDARD"]?.order ?? 1
      return oa - ob
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
          const isAdvanced = cs.level === "ADVANCED"
          const levelInfo = cs.level ? LEVEL_META[cs.level] : null
          const PreviewComponent = PREVIEW_BY_ID[cs.id]
          const events = LIVE_EVENTS[cs.id] ?? []
          const featureLimit = isAdvanced ? 6 : 3
          const resultLimit = isAdvanced ? 3 : 2

          return (
            <StaggerItem key={cs.id} className={isAdvanced ? "md:col-span-2" : ""}>
              <Link
                href={`/cases/${cs.slug}`}
                className="group block glass-panel hover-glow overflow-hidden h-full"
              >
                {isAdvanced ? (
                  /* ======== ADVANCED — two-column layout ======== */
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Left — content */}
                    <div className="lg:col-span-3 p-5 space-y-4">
                      {/* Badges */}
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

                      {/* Title */}
                      <div>
                        <h2 className="font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors leading-snug text-base">
                          {cs.title}
                        </h2>
                        <p className="text-text-muted text-xs leading-relaxed">{cs.description}</p>
                      </div>

                      {/* Workflow */}
                      {cs.workflow && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {cs.workflow.map((step, i) => (
                            <div key={i} className="flex items-center gap-1 shrink-0">
                              <span className="text-[10px] px-2 py-1 rounded-md bg-white/[0.04] text-text-muted border border-white/[0.04]">
                                {step}
                              </span>
                              {i < cs.workflow!.length - 1 && <ChevronRight size={10} className="text-accent/30" />}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Automated features */}
                      {cs.automatedFeatures && (
                        <div>
                          <p className="text-text-muted/70 text-[10px] font-medium uppercase tracking-wider mb-2">{t.casesPage.automated}</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                            {cs.automatedFeatures.slice(0, featureLimit).map((feat, i) => (
                              <div key={i} className="flex items-start gap-1.5">
                                <Check size={11} className="text-emerald-400 mt-0.5 shrink-0" />
                                <span className="text-text-secondary text-[11px] leading-tight">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Results */}
                      <div>
                        <p className="text-text-muted/70 text-[10px] font-medium uppercase tracking-wider mb-2">{t.casesPage.results}</p>
                        <div className="space-y-1.5">
                          {cs.results.slice(0, resultLimit).map((r, i) => (
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

                      {/* Proof + techs + CTA */}
                      {cs.proofMetrics && (
                        <div className="flex items-center gap-3 flex-wrap">
                          {cs.proofMetrics.map((pm, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                              <span className="text-text-primary text-[11px] font-semibold tabular-nums">{pm.value}</span>
                              <span className="text-text-muted/70 text-[10px]">{pm.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                        <div className="flex flex-wrap gap-1.5">
                          {cs.technologies.map((tech) => (
                            <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.03] text-text-muted border border-white/[0.04]">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="text-accent text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all shrink-0 ml-3">
                          {t.casesPage.viewScenario} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>

                    {/* Right — mock UI + events */}
                    <div className="lg:col-span-2 p-5 lg:border-l border-white/[0.04] space-y-4 bg-white/[0.01]">
                      {PreviewComponent && <PreviewComponent />}

                      {/* Live events */}
                      {events.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <p className="text-text-muted/70 text-[10px] font-medium uppercase tracking-wider">
                              {t.casesPage.liveEvents}
                            </p>
                          </div>
                          <div className="space-y-1">
                            {events.map((ev, i) => (
                              <div key={i} className="flex items-start gap-2 py-0.5">
                                <span className="text-emerald-400/50 text-[10px] mt-0.5 shrink-0">●</span>
                                <span className="text-text-muted text-[11px] leading-relaxed">{ev}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* ======== STANDARD / BASIC — single-column ======== */
                  <div>
                    {/* Header — badges + optional mini preview */}
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
                      </div>

                      {/* Mini UI Preview */}
                      {PreviewComponent && <PreviewComponent />}
                    </div>

                    {/* Content */}
                    <div className="px-5 py-4 space-y-3">
                      <div>
                        <h2 className="font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors leading-snug text-[15px]">
                          {cs.title}
                        </h2>
                        <p className="text-text-muted text-xs line-clamp-2 leading-relaxed">{cs.description}</p>
                      </div>

                      {/* Top features */}
                      {cs.automatedFeatures && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {cs.automatedFeatures.slice(0, featureLimit).map((feat, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <Check size={10} className="text-emerald-400 shrink-0" />
                              <span className="text-text-secondary text-[11px]">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Results */}
                      <div className="space-y-1">
                        {cs.results.slice(0, resultLimit).map((r, i) => (
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

                      {/* Proof metrics */}
                      {cs.proofMetrics && (
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {cs.proofMetrics.map((pm, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                              <span className="text-text-primary text-[11px] font-semibold tabular-nums">{pm.value}</span>
                              <span className="text-text-muted/70 text-[10px]">{pm.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Live events — compact */}
                      {events.length > 0 && (
                        <div className="pt-2 border-t border-white/[0.04] space-y-0.5">
                          {events.slice(0, 2).map((ev, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-400/50 text-[10px] mt-0.5 shrink-0">●</span>
                              <span className="text-text-muted/80 text-[10px] leading-relaxed">{ev}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer — techs + CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                        <div className="flex flex-wrap gap-1">
                          {cs.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.03] text-text-muted border border-white/[0.04]">
                              {tech}
                            </span>
                          ))}
                          {cs.technologies.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-text-muted/80">
                              +{cs.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        <span className="text-accent text-[11px] font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all shrink-0">
                          {t.casesPage.viewScenario} <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
