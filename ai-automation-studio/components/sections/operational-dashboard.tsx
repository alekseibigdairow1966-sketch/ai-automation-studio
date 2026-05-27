"use client"

import { motion } from "framer-motion"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Activity, Clock, Users, Wrench, CheckCircle2, AlertTriangle } from "lucide-react"
import { useLocale } from "@/lib/i18n"

const queueItems = [
  { id: "SC-1247", device: "iPhone 14 Pro", type_ru: "Замена экрана", type_kk: "Экранды ауыстыру", status: "in_progress", master: "Александр К.", time_ru: "1ч 20м", time_kk: "1с 20м" },
  { id: "SC-1248", device: "Acer Nitro V15", type_ru: "Диагностика", type_kk: "Диагностика", status: "waiting", master: "—", time_ru: "Ожидает", time_kk: "Күтуде" },
  { id: "SC-1249", device: "Samsung S24", type_ru: "Замена батареи", type_kk: "Батареяны ауыстыру", status: "done", master: "Михаил В.", time_ru: "45м", time_kk: "45м" },
  { id: "SC-1250", device: "iPad Pro 12.9", type_ru: "Ремонт разъёма", type_kk: "Ұяшықты жөндеу", status: "in_progress", master: "Дмитрий С.", time_ru: "2ч 10м", time_kk: "2с 10м" },
  { id: "SC-1251", device: "AirPods Pro", type_ru: "Не заряжается", type_kk: "Зарядталмайды", status: "waiting", master: "—", time_ru: "Ожидает", time_kk: "Күтуде" },
]

const statusColors: Record<string, string> = {
  in_progress: "text-amber-400 bg-amber-500/10 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
  waiting: "text-blue-400 bg-blue-500/10",
  done: "text-green-400 bg-green-500/10 shadow-[0_0_8px_rgba(34,197,94,0.15)]",
}

export function OperationalDashboard() {
  const { locale, t } = useLocale()

  const statusLabels: Record<string, string> = {
    in_progress: t.dashboard.inProgress as string,
    waiting: t.dashboard.waiting as string,
    done: t.dashboard.done as string,
  }

  const miniMetrics = [
    { icon: Activity, label: t.dashboard.requestsToday, value: "34", change: "+12%" },
    { icon: Clock, label: t.dashboard.avgTime, value: "1.5ч", change: "−18%" },
    { icon: Users, label: t.dashboard.mastersOnShift, value: "4/5", change: "" },
    { icon: CheckCircle2, label: t.dashboard.completed, value: "28", change: "+8%" },
  ]

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">{t.dashboard.badge}</p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-3">
            {t.dashboard.title}
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            {t.dashboard.subtitle}
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="glass-panel p-4 sm:p-6 overflow-hidden">
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 live-ring text-green-400" />
                </div>
                <span className="text-text-primary text-sm font-medium">Live Operations</span>
                <span className="text-text-muted text-xs">{t.dashboard.updatedAgo}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-text-muted text-xs px-2 py-1 rounded bg-white/5">{t.dashboard.today}</span>
                <span className="text-accent text-xs px-2 py-1 rounded bg-accent/10">{t.dashboard.week}</span>
              </div>
            </div>

            {/* Mini metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {miniMetrics.map((m, i) => {
                const Icon = m.icon
                return (
                  <motion.div
                    key={i}
                    className="bg-background/50 border border-white/5 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} className="text-text-muted" />
                      <span className="text-text-muted text-xs">{m.label}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <motion.span
                        className="text-text-primary text-xl font-bold"
                        initial={{ opacity: 0, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
                      >
                        {m.value}
                      </motion.span>
                      {m.change && (
                        <motion.span
                          className={`text-xs mb-0.5 ${m.change.startsWith("+") || m.change.startsWith("−") ? (m.change.startsWith("−") ? "text-green-400" : "text-accent") : "text-text-muted"}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.9 + i * 0.12 }}
                        >
                          {m.change}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Queue table */}
            <div className="bg-background/50 border border-white/5 rounded-xl overflow-x-auto">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Wrench size={14} className="text-text-muted" />
                <span className="text-text-primary text-sm font-medium">{t.dashboard.repairQueue}</span>
                <span className="text-text-muted text-xs ml-auto">{t.dashboard.activeCount}</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {queueItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="px-4 py-3 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                  >
                    <span className="text-text-muted text-xs font-mono w-14 sm:w-16 shrink-0 hidden sm:block">{item.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary text-sm truncate">{item.device}</p>
                      <p className="text-text-muted text-xs">{locale === "kk" ? item.type_kk : item.type_ru}</p>
                    </div>
                    <span className="hidden sm:block text-text-muted text-xs w-24 truncate">{item.master}</span>
                    <span className="hidden sm:block text-text-muted text-xs w-16 text-right">{locale === "kk" ? item.time_kk : item.time_ru}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom hint */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
              <AlertTriangle size={12} className="text-amber-400" />
              <span className="text-text-muted text-xs">{t.dashboard.alertHint}</span>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
