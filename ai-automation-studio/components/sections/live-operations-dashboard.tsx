"use client"

import { motion } from "framer-motion"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

/* ── i18n ── */
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

/* ── Data ── */
const kpiCards = [
  { label: "Active Repairs", value: 47, sub: "+3 since last hour" },
  { label: "Waiting Parts", value: 12, sub: "2 supplier delays detected" },
  { label: "Completed Today", value: 8, sub: "92% SLA completed" },
]

const tickets: {
  id: string
  device: string
  status: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  highlight?: boolean
}[] = [
  { id: "#4821", device: "Galaxy S25 Ultra", status: "In Progress", priority: "HIGH", highlight: true },
  { id: "#4820", device: "Samsung S22", status: "Diagnostics", priority: "MEDIUM" },
  { id: "#4819", device: "Acer Nitro V15", status: "Waiting Parts", priority: "LOW" },
]

const activityFeed: { time: string; text: string; color: string }[] = [
  { time: "14:32", text: "New repair ticket created", color: "bg-emerald-400" },
  { time: "14:32", text: "Technician notified via Telegram", color: "bg-blue-400" },
  { time: "14:33", text: "Client confirmation sent", color: "bg-emerald-400" },
  { time: "14:34", text: "Dashboard updated", color: "bg-neutral-500" },
]

const priorityStyles: Record<string, string> = {
  HIGH: "text-red-400 bg-red-500/10 border-red-500/25",
  MEDIUM: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  LOW: "text-neutral-500 bg-neutral-500/8 border-neutral-500/15",
}

export function LiveOperationsDashboard() {
  const { locale } = useLocale()
  const t = content[locale]

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header — tighter spacing */}
        <MotionWrapper className="text-center mb-8">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
            {t.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            {t.title}
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </MotionWrapper>

        {/* Dashboard Container */}
        <MotionWrapper delay={0.1}>
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
                <span className="text-emerald-400/70 text-[10px] font-semibold uppercase tracking-wider">
                  Live
                </span>
              </div>
              <span className="text-text-muted text-xs hidden sm:block tabular-nums">
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
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <p className="text-text-muted text-[11px] sm:text-xs mb-1.5 tracking-wide">
                    {card.label}
                  </p>
                  <p className="text-text-primary text-2xl sm:text-3xl font-semibold tabular-nums mb-1">
                    {card.value}
                  </p>
                  <p className="text-text-muted/60 text-[10px] sm:text-[11px] leading-tight">
                    {card.sub}
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
                <div className="hidden sm:grid grid-cols-[72px_1fr_120px_80px] px-5 sm:px-6 py-2 border-b border-white/[0.04]">
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
                    className={`grid grid-cols-2 sm:grid-cols-[72px_1fr_120px_80px] px-5 sm:px-6 py-3 items-center gap-y-0.5 sm:gap-0 transition-colors duration-150 ${
                      ticket.highlight
                        ? "bg-white/[0.025] border-l-2 border-l-accent/40"
                        : "hover:bg-white/[0.015]"
                    } ${
                      i < tickets.length - 1
                        ? "border-b border-white/[0.04]"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
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
                        className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded border ${priorityStyles[ticket.priority]}`}
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
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    >
                      <span className="flex items-center gap-2 shrink-0 pt-1">
                        <span className={`block w-1.5 h-1.5 rounded-full ${item.color}`} />
                        <span className="text-text-muted text-xs font-mono tabular-nums">
                          {item.time}
                        </span>
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
