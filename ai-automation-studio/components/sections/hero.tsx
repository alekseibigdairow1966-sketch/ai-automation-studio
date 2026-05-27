"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/i18n"

export interface HeroContent {
  badge: string
  title: string
  titleAccent: string
  subtitle: string
  stats: { value: string; label: string }[]
}

export function Hero({ content }: { content?: HeroContent }) {
  const { t } = useLocale()

  const c = content ?? {
    badge: t.hero.badge,
    title: t.hero.title,
    titleAccent: t.hero.titleAccent,
    subtitle: t.hero.subtitle,
    stats: t.hero.stats as unknown as { value: string; label: string }[],
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background — animated drift */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-end/15 rounded-full blur-[120px] animate-drift-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-pulse-ambient" />
        {/* Subtle operational grid */}
        <div className="absolute inset-0 hero-grid opacity-[0.03]" />
        {/* Faint routing lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="80%" y1="25%" x2="55%" y2="45%" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="60%" y1="70%" x2="45%" y2="55%" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="50%" cy="50%" r="2" fill="white" opacity="0.3" />
          <circle cx="20%" cy="30%" r="1.5" fill="white" opacity="0.2" />
          <circle cx="80%" cy="25%" r="1.5" fill="white" opacity="0.2" />
          <circle cx="60%" cy="70%" r="1.5" fill="white" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-12">
          {/* Left: Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-accent font-medium tracking-wide">
                {c.badge}
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
              {c.title}
              {c.titleAccent && (
                <>
                  {" "}
                  <span className="accent-gradient-text">{c.titleAccent}</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mb-10 leading-relaxed lg:mx-0 mx-auto">
              {c.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-16">
              <Link href="/cases">
                <Button
                  size="lg"
                  className="accent-gradient text-white font-medium px-8 hover:opacity-90 transition-opacity"
                >
                  {t.hero.cta1}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 text-text-primary hover:bg-white/5 px-8"
                >
                  {t.hero.cta2}
                </Button>
              </Link>
            </div>

            {/* Stats — staggered blur reveal */}
            <div className="flex justify-center lg:justify-start gap-8 sm:gap-12">
              {c.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.15,
                    ease: "easeOut",
                  }}
                >
                  <p className="text-3xl sm:text-4xl font-bold accent-gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-text-muted text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Operational System Visual — enlarged 15-20% */}
          <motion.div
            className="relative shrink-0 w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[520px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Subtle glow behind */}
            <div className="absolute -inset-8 bg-accent/[0.04] blur-[80px] rounded-3xl" />

            {/* Main dashboard card */}
            <div className="relative bg-[#08080d] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Top bar */}
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-text-primary text-[11px] font-medium">Operations</span>
                  <span className="text-emerald-400/70 text-[9px] font-semibold uppercase tracking-wider">Live</span>
                </div>
                <span className="text-text-muted text-[10px] tabular-nums">14:32 · Updated 12s ago</span>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-3 border-b border-white/5">
                {[
                  { label: "Active", value: "47", sub: "+3 за час", color: "text-text-primary" },
                  { label: "Queue", value: "12", sub: "2 SLA risk", color: "text-amber-400" },
                  { label: "Done", value: "8", sub: "92% SLA ok", color: "text-emerald-400" },
                ].map((kpi, i) => (
                  <div key={kpi.label} className={`px-3.5 py-3 ${i < 2 ? "border-r border-white/5" : ""}`}>
                    <p className="text-text-muted text-[9px] uppercase tracking-wider mb-0.5">{kpi.label}</p>
                    <p className={`text-xl font-semibold tabular-nums ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-text-muted/50 text-[8px] mt-0.5">{kpi.sub}</p>
                  </div>
                ))}
              </div>

              {/* Ticket rows — operational realism */}
              <div>
                {[
                  { id: "#4821", device: "Galaxy S25 Ultra", status: "In Progress", sla: "SLA 2h", tech: "Ермек К.", priority: "HIGH" as const, highlight: true },
                  { id: "#4820", device: "Samsung S22", status: "Diagnostics", sla: "SLA risk", tech: "Диагн. отдел", priority: "MED" as const, highlight: false },
                  { id: "#4819", device: "Acer Nitro V15", status: "Waiting Parts", sla: "Delayed", tech: "Ожидание", priority: "LOW" as const, highlight: false },
                  { id: "#4818", device: "iPhone 15 Pro", status: "Intake", sla: "New", tech: "Приёмка", priority: "MED" as const, highlight: false },
                ].map((ticket, i, arr) => (
                  <div
                    key={ticket.id}
                    className={`px-4 py-2 flex items-center justify-between ${
                      ticket.highlight ? "bg-white/[0.025] border-l-2 border-l-accent/40" : ""
                    } ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-text-muted text-[10px] font-mono">{ticket.id}</span>
                      <span className="text-text-primary text-[11px]">{ticket.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted/50 text-[8px] hidden sm:inline">{ticket.tech}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded ${
                        ticket.sla === "SLA risk" || ticket.sla === "Delayed"
                          ? "text-amber-400/70 bg-amber-500/5"
                          : "text-text-muted/40 bg-white/[0.02]"
                      }`}>
                        {ticket.sla}
                      </span>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded border ${
                          ticket.priority === "HIGH"
                            ? "text-red-400 bg-red-500/10 border-red-500/25"
                            : ticket.priority === "MED"
                              ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
                              : "text-neutral-500 bg-neutral-500/8 border-neutral-500/15"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom status bar */}
              <div className="px-4 py-1.5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                <span className="text-text-muted/40 text-[8px]">Queue load: 78%</span>
                <span className="text-text-muted/40 text-[8px]">SLA compliance: 92%</span>
              </div>
            </div>

            {/* Floating: Telegram escalation */}
            <motion.div
              className="absolute -bottom-4 -left-3 sm:-left-6 bg-[#0a0a12] border border-white/10 rounded-lg px-3.5 py-2.5 shadow-2xl z-10"
              initial={{ opacity: 0, y: 10, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <span className="block w-1.5 h-1.5 rounded-full bg-blue-400" />
                </div>
                <div>
                  <p className="text-text-primary text-[10px] font-medium">Telegram: мастер назначен</p>
                  <p className="text-text-muted text-[9px]">#4821 · Ермек К. · 14:32</p>
                </div>
              </div>
            </motion.div>

            {/* Floating: SLA monitoring indicator */}
            <motion.div
              className="absolute -top-3 -right-2 sm:-right-4 bg-[#0a0a12] border border-amber-500/15 rounded-lg px-3 py-2 shadow-2xl z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-amber-500/10 flex items-center justify-center">
                  <span className="block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-amber-400/80 text-[9px] font-medium">SLA Monitor</p>
                  <p className="text-text-muted text-[8px]">2 at risk</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
