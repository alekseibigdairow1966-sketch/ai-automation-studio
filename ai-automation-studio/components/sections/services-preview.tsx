"use client"

import Link from "next/link"
import { ArrowUpRight, Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const ICON_MAP: Record<string, React.ElementType> = {
  Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy,
}

const previewServices = [
  { icon: "Headphones", title: "AI Receptionist", desc: "Автоматический приём обращений 24/7" },
  { icon: "MessageCircle", title: "WhatsApp AI", desc: "AI-бот для WhatsApp Business" },
  { icon: "Database", title: "CRM Automation", desc: "Автоматизация CRM через n8n" },
  { icon: "Bot", title: "AI Operators", desc: "AI-обработка заявок и лидов" },
  { icon: "Workflow", title: "n8n Workflows", desc: "Построение автоматизаций" },
  { icon: "LifeBuoy", title: "AI Support", desc: "AI-поддержка с базой знаний" },
]

export function ServicesPreview() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Услуги</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Что мы автоматизируем
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewServices.map((svc) => {
            const Icon = ICON_MAP[svc.icon]
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
