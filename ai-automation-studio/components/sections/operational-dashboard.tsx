"use client"

import { motion } from "framer-motion"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Activity, Clock, Users, Wrench, CheckCircle2, AlertTriangle } from "lucide-react"

const queueItems = [
  { id: "SC-1247", device: "iPhone 14 Pro", type: "Замена экрана", status: "in_progress", master: "Александр К.", time: "1ч 20м" },
  { id: "SC-1248", device: "MacBook Air M2", type: "Диагностика", status: "waiting", master: "—", time: "Ожидает" },
  { id: "SC-1249", device: "Samsung S24", type: "Замена батареи", status: "done", master: "Михаил В.", time: "45м" },
  { id: "SC-1250", device: "iPad Pro 12.9", type: "Ремонт разъёма", status: "in_progress", master: "Дмитрий С.", time: "2ч 10м" },
  { id: "SC-1251", device: "AirPods Pro", type: "Не заряжается", status: "waiting", master: "—", time: "Ожидает" },
]

const statusColors: Record<string, string> = {
  in_progress: "text-amber-400 bg-amber-500/10",
  waiting: "text-blue-400 bg-blue-500/10",
  done: "text-green-400 bg-green-500/10",
}

const statusLabels: Record<string, string> = {
  in_progress: "В работе",
  waiting: "В очереди",
  done: "Готово",
}

const miniMetrics = [
  { icon: Activity, label: "Заявок сегодня", value: "34", change: "+12%" },
  { icon: Clock, label: "Среднее время", value: "1.5ч", change: "−18%" },
  { icon: Users, label: "Мастеров на смене", value: "4/5", change: "" },
  { icon: CheckCircle2, label: "Завершено", value: "28", change: "+8%" },
]

export function OperationalDashboard() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Операционный контроль</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Dashboard директора сервисного центра
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Real-time контроль операций вместо ежедневных обзвонов мастеров
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="glass-panel p-4 sm:p-6 overflow-hidden">
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-text-primary text-sm font-medium">Live Operations</span>
                <span className="text-text-muted text-xs">Обновлено 30 сек назад</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-text-muted text-xs px-2 py-1 rounded bg-white/5">Сегодня</span>
                <span className="text-accent text-xs px-2 py-1 rounded bg-accent/10">Неделя</span>
              </div>
            </div>

            {/* Mini metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {miniMetrics.map((m, i) => {
                const Icon = m.icon
                return (
                  <motion.div
                    key={m.label}
                    className="bg-background/50 border border-white/[0.06] rounded-xl p-4"
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
                      <span className="text-text-primary text-xl font-bold">{m.value}</span>
                      {m.change && (
                        <span className={`text-xs mb-0.5 ${m.change.startsWith("+") || m.change.startsWith("−") ? (m.change.startsWith("−") ? "text-green-400" : "text-accent") : "text-text-muted"}`}>
                          {m.change}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Queue table */}
            <div className="bg-background/50 border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
                <Wrench size={14} className="text-text-muted" />
                <span className="text-text-primary text-sm font-medium">Очередь ремонтов</span>
                <span className="text-text-muted text-xs ml-auto">5 активных</span>
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
                    <span className="text-text-muted text-xs font-mono w-16 shrink-0">{item.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary text-sm truncate">{item.device}</p>
                      <p className="text-text-muted text-xs">{item.type}</p>
                    </div>
                    <span className="hidden sm:block text-text-muted text-xs w-24 truncate">{item.master}</span>
                    <span className="hidden sm:block text-text-muted text-xs w-16 text-right">{item.time}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom hint */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.04]">
              <AlertTriangle size={12} className="text-amber-400" />
              <span className="text-text-muted text-xs">2 заявки ожидают назначения мастера более 30 минут</span>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
