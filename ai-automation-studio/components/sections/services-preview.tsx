"use client"

import Link from "next/link"
import { ArrowUpRight, Headphones, MessageCircle, GitBranch, Database, BarChart3, Workflow } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const previewServices = [
  {
    icon: Headphones,
    title: "AI-приёмка обращений",
    desc: "Автоматический приём заявок из WhatsApp, Telegram, сайта и телефона 24/7",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-автоматизация",
    desc: "AI-бот общается с клиентами: приём заявок, статусы ремонта, ответы на вопросы",
  },
  {
    icon: GitBranch,
    title: "Маршрутизация заявок",
    desc: "AI распределяет заявки по мастерам с учётом специализации и загрузки",
  },
  {
    icon: Database,
    title: "CRM-автоматизация",
    desc: "Заявки создаются автоматически, статусы обновляются, воронка прозрачна",
  },
  {
    icon: BarChart3,
    title: "Аналитика и контроль",
    desc: "Real-time dashboard: загрузка мастеров, скорость обработки, NPS",
  },
  {
    icon: Workflow,
    title: "Бизнес-процессы",
    desc: "Настройка n8n-workflows под процессы вашего сервисного центра",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Решения</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Что мы автоматизируем
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewServices.map((svc) => {
            const Icon = svc.icon
            return (
              <StaggerItem key={svc.title}>
                <Link href="/services" className="group block glass-panel hover-glow p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
                      <Icon size={18} className="text-white" />
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1.5">{svc.title}</h3>
                  <p className="text-text-muted text-sm">{svc.desc}</p>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
