"use client"

import { motion } from "framer-motion"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const content = {
  ru: {
    badge: "Операционный контроль",
    title: "Live Operations Dashboard",
    subtitle:
      "AI-автоматизация обновляет ремонтные операции, маршрутизацию мастеров и коммуникацию с клиентами в реальном времени.",
  },
  kk: {
    badge: "Операциялық бақылау",
    title: "Live Operations Dashboard",
    subtitle:
      "AI-автоматтандыру жөндеу операцияларын, шеберлерді бағыттауды және клиенттермен байланысты нақты уақытта жаңартады.",
  },
} as const

const kpiCards = [
  { label: "Active Repairs", value: 47 },
  { label: "Waiting Parts", value: 12 },
  { label: "Completed Today", value: 8 },
]

const tickets: {
  id: string
  device: string
  status: string
  priority: "HIGH" | "MEDIUM" | "LOW"
}[] = [
  { id: "#4821", device: "iPhone 13", status: "In Progress", priority: "HIGH" },
  { id: "#4820", device: "Samsung S22", status: "Diagnostics", priority: "MEDIUM" },
  { id: "#4819", device: "MacBook Air M2", status: "Waiting Parts", priority: "LOW" },
]

const activityFeed = [
  { time: "14:32", text: "New repair ticket created" },
  { time: "14:32", text: "Technician notified via Telegram" },
  { time: "14:33", text: "Client confirmation sent" },
  { time: "14:34", text: "Dashboard updated" },
]

const priorityStyles: Record<string, string> = {
  HIGH: "text-red-400 bg-red-500/10 border-red-500/20",
  MEDIUM: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  LOW: "text-neutral-500 bg-neutral-500/8 border-neutral-500/15",
}

export function LiveOperationsDashboard() {
  const { locale } = useLocale()
  const t = content[locale]

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <MotionWrapper className="text-center mb-14">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
            {t.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </MotionWrapper>

        {/* Dashboard Container */}
        <MotionWrapper delay={0.15}>
          <div className="bg-[#08080d] border border-white/[0.07] rounded-2xl overflow-hidden">
            {/* ── Top Bar ── */}
            <div className="px-5 sm:px-6 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-text-primary text-sm font-medium">
                  Operations
                </span>
                <span className="text-text-muted text-xs">· Live</span>
              </div>
              <span className="text-text-muted text-xs hidden sm:block">
                Updated 12s ago
              </span>
            </div>

            {/* ── KPI Cards Row ── */}
            <div className="grid grid-cols-3 border-b border-white/[0.06]">
              {kpiCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  className={`px-5 sm:px-6 py-5 sm:py-6 ${
                    i < kpiCards.length - 1
                      ? "border-r border-white/[0.06]"
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                >
                  <p className="text-text-muted text-[11px] sm:text-xs mb-2 tracking-wide">
                    {card.label}
                  </p>
                  <p className="text-text-primary text-2xl sm:text-3xl font-semibold tabular-nums">
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ── Main Grid: Table + Feed ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-0">
              {/* LEFT — Repair Tickets Table */}
              <div className="lg:col-span-3 lg:border-r border-white/[0.06]">
                <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06]">
                  <span className="text-text-primary text-sm font-medium">
                    Recent Repair Tickets
                  </span>
                </div>

                {/* Table Header (desktop) */}
                <div className="hidden sm:grid grid-cols-[72px_1fr_120px_72px] px-5 sm:px-6 py-2 border-b border-white/[0.04]">
                  <span className="text-text-muted text-[11px] uppercase tracking-wider">
                    Ticket
                  </span>
                  <span className="text-text-muted text-[11px] uppercase tracking-wider">
                    Device
                  </span>
                  <span className="text-text-muted text-[11px] uppercase tracking-wider">
                    Status
                  </span>
                  <span className="text-text-muted text-[11px] uppercase tracking-wider text-right">
                    Priority
                  </span>
                </div>

                {/* Rows */}
                {tickets.map((ticket, i) => (
                  <motion.div
                    key={ticket.id}
                    className={`grid grid-cols-2 sm:grid-cols-[72px_1fr_120px_72px] px-5 sm:px-6 py-3 items-center gap-y-0.5 sm:gap-0 hover:bg-white/[0.02] transition-colors duration-150 ${
                      i < tickets.length - 1
                        ? "border-b border-white/[0.04]"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="text-text-muted text-xs font-mono">
                      {ticket.id}
                    </span>
                    <span className="text-text-primary text-sm sm:order-none order-first col-span-2 sm:col-span-1">
                      {ticket.device}
                    </span>
                    <span className="text-text-secondary text-xs">
                      {ticket.status}
                    </span>
                    <span className="text-right">
                      <span
                        className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded border ${priorityStyles[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* RIGHT — Live Activity Feed */}
              <div className="lg:col-span-2 border-t lg:border-t-0 border-white/[0.06]">
                <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-text-primary text-sm font-medium">
                    Live Activity Feed
                  </span>
                  <span className="text-text-muted text-[10px] uppercase tracking-wider">
                    Today
                  </span>
                </div>

                <div>
                  {activityFeed.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`px-5 sm:px-6 py-3 flex items-start gap-3 ${
                        i < activityFeed.length - 1
                          ? "border-b border-white/[0.04]"
                          : ""
                      }`}
                      initial={{ opacity: 0, x: 6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                    >
                      <span className="text-text-muted text-xs font-mono shrink-0 pt-px tabular-nums">
                        {item.time}
                      </span>
                      <span className="text-text-secondary text-sm leading-snug">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
