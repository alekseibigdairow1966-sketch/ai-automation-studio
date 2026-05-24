"use client"

import { motion } from "framer-motion"
import { Headphones, MessageCircle, BarChart3, Settings, ArrowRight, Check } from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const demos = [
  {
    icon: Headphones,
    title: "AI-ресепшн",
    subtitle: "Автоматический приём заявок 24/7",
    flow: [
      { from: "Клиент", msg: "Здравствуйте, ноутбук не включается", align: "right" as const },
      { from: "AI", msg: "Здравствуйте! Создаю заявку на диагностику. Ваше имя?", align: "left" as const },
      { from: "Клиент", msg: "Алексей, +7 999 123-45-67", align: "right" as const },
      { from: "AI", msg: "Заявка #2847 создана. Мастер свяжется в течение 30 минут.", align: "left" as const },
    ],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-автоматизация",
    subtitle: "Уведомления о статусе ремонта",
    flow: [
      { from: "Система", msg: "Статус заявки #2847 обновлён → Диагностика", align: "left" as const },
      { from: "WhatsApp", msg: "Алексей, ваш ноутбук на диагностике. Результат — через 2 часа.", align: "left" as const },
      { from: "Система", msg: "Статус → Ремонт завершён", align: "left" as const },
      { from: "WhatsApp", msg: "Алексей, ноутбук готов! Можете забрать сегодня до 20:00.", align: "left" as const },
    ],
  },
  {
    icon: BarChart3,
    title: "Операционный dashboard",
    subtitle: "Real-time контроль бизнеса",
    metrics: [
      { label: "Заявок сегодня", value: "47", change: "+12%" },
      { label: "Среднее время ответа", value: "28 сек", change: "-85%" },
      { label: "Загрузка мастеров", value: "78%", change: "норма" },
      { label: "NPS клиентов", value: "4.8", change: "+0.6" },
    ],
  },
  {
    icon: Settings,
    title: "n8n-автоматизация",
    subtitle: "Автоматические бизнес-процессы",
    pipeline: [
      "Заявка в WhatsApp",
      "AI классификация",
      "CRM запись",
      "Назначение мастера",
      "Telegram уведомление",
      "Клиент: статус",
    ],
  },
]

export function InteractiveDemos() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
            Как это работает
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Операционные AI-системы в действии
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto">
            Реальные сценарии автоматизации — от приёма заявок до аналитики
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {demos.map((demo) => {
            const Icon = demo.icon
            return (
              <StaggerItem key={demo.title}>
                <div className="glass-panel p-6 h-full hover-glow group">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold text-sm">{demo.title}</h3>
                      <p className="text-text-muted text-xs">{demo.subtitle}</p>
                    </div>
                  </div>

                  {/* Chat flow demos */}
                  {"flow" in demo && demo.flow && (
                    <div className="space-y-2">
                      {demo.flow.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: msg.align === "right" ? 10 : -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className={`flex ${msg.align === "right" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                              msg.align === "right"
                                ? "bg-accent/15 text-accent border border-accent/20 rounded-br-sm"
                                : "bg-white/[0.06] text-text-secondary border border-white/[0.06] rounded-bl-sm"
                            }`}
                          >
                            <span className="text-text-muted text-[10px] block mb-0.5">{msg.from}</span>
                            {msg.msg}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Dashboard metrics demo */}
                  {"metrics" in demo && demo.metrics && (
                    <div className="grid grid-cols-2 gap-2">
                      {demo.metrics.map((m, i) => (
                        <motion.div
                          key={m.label}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.04]"
                        >
                          <p className="text-text-muted text-[10px] mb-1">{m.label}</p>
                          <p className="text-text-primary text-sm font-bold">{m.value}</p>
                          <p className="text-accent text-[10px] font-medium">{m.change}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Pipeline demo */}
                  {"pipeline" in demo && demo.pipeline && (
                    <div className="space-y-1.5">
                      {demo.pipeline.map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-accent" />
                          </div>
                          <span className="text-text-secondary text-xs">{step}</span>
                          {i < demo.pipeline.length - 1 && (
                            <ArrowRight size={10} className="text-text-muted ml-auto" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* CTA */}
        <MotionWrapper delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/audit">
              <Button size="lg" className="accent-gradient text-white font-medium px-8">
                Пройти AI-аудит бизнеса <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
