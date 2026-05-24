"use client"

import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { MessageCircle, Bot, Database, Wrench, Bell, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    label: "Обращение",
    desc: "WhatsApp, Telegram, сайт, звонок",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: Bot,
    label: "AI-приёмка",
    desc: "Классификация, сбор данных, создание заявки",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Database,
    label: "CRM",
    desc: "Заявка в системе, статус, история",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Wrench,
    label: "Мастер",
    desc: "Назначение, выполнение, обновление статуса",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Bell,
    label: "Уведомление",
    desc: "Клиент информирован на каждом этапе",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: BarChart3,
    label: "Аналитика",
    desc: "Dashboard, метрики, контроль",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
]

export function ArchitectureShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Архитектура</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Как работает AI-система сервисного центра
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            От обращения клиента до завершения ремонта — полная автоматизация
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="glass-panel p-6 sm:p-10">
            {/* Desktop: horizontal flow */}
            <div className="hidden lg:block">
              <StaggerContainer className="grid grid-cols-6 gap-3">
                {steps.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <StaggerItem key={step.label}>
                      <div className="relative">
                        {/* Connector line */}
                        {i < steps.length - 1 && (
                          <div className="absolute top-6 left-[calc(50%+28px)] right-[-12px] h-px bg-gradient-to-r from-white/10 to-white/5 z-0" />
                        )}
                        {/* Step */}
                        <div className="relative z-10 text-center">
                          <div className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center mx-auto mb-3`}>
                            <Icon size={20} className={step.color} />
                          </div>
                          <p className="text-text-primary text-xs font-semibold mb-1">{step.label}</p>
                          <p className="text-text-muted text-[10px] leading-tight">{step.desc}</p>
                        </div>
                        {/* Step number */}
                        <div className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-background border border-white/10 flex items-center justify-center">
                          <span className="text-text-muted text-[9px] font-medium">{i + 1}</span>
                        </div>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            </div>

            {/* Mobile: vertical flow */}
            <div className="lg:hidden space-y-4">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-start gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center shrink-0`}>
                        <Icon size={18} className={step.color} />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px h-6 bg-white/10 mt-2" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="text-text-primary text-sm font-semibold">{step.label}</p>
                      <p className="text-text-muted text-xs">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
