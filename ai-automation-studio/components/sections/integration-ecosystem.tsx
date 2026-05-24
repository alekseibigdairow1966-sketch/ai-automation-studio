"use client"

import { motion } from "framer-motion"
import {
  MessageCircle,
  Send,
  Database,
  Workflow,
  Brain,
  Globe,
  Mail,
  Phone,
  BarChart3,
  Shield,
} from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const integrations = [
  { icon: MessageCircle, name: "WhatsApp API", category: "Коммуникации" },
  { icon: Send, name: "Telegram Bot", category: "Коммуникации" },
  { icon: Brain, name: "OpenAI GPT", category: "AI" },
  { icon: Workflow, name: "n8n", category: "Автоматизация" },
  { icon: Database, name: "Supabase", category: "Данные" },
  { icon: Globe, name: "REST API", category: "Интеграции" },
  { icon: Mail, name: "SMTP / Email", category: "Коммуникации" },
  { icon: Phone, name: "Телефония", category: "Коммуникации" },
  { icon: BarChart3, name: "Google Sheets", category: "Данные" },
  { icon: Shield, name: "Webhooks", category: "Автоматизация" },
]

const pipeline = [
  { label: "Входящая заявка", sublabel: "WhatsApp / Telegram / Сайт" },
  { label: "AI-классификация", sublabel: "GPT анализ + маршрутизация" },
  { label: "CRM / Supabase", sublabel: "Запись + статус + история" },
  { label: "n8n-оркестрация", sublabel: "Workflow-автоматизация" },
  { label: "Уведомления", sublabel: "Клиент + мастер + директор" },
  { label: "Аналитика", sublabel: "Dashboard + отчёты + AI" },
]

export function IntegrationEcosystem() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
            Экосистема
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Интеграции и технологический стек
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto">
            Мы интегрируем проверенные технологии в единую операционную систему для вашего бизнеса
          </p>
        </MotionWrapper>

        {/* Integration grid */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-16">
          {integrations.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.name}>
                <div className="glass-panel p-4 text-center hover-glow group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:shadow-[0_0_16px_rgba(99,102,241,0.15)]">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <p className="text-text-primary text-xs font-semibold mb-0.5">{item.name}</p>
                  <p className="text-text-muted text-[10px]">{item.category}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Data pipeline */}
        <MotionWrapper delay={0.2}>
          <div className="glass-panel p-6 sm:p-8">
            <h3 className="text-text-primary font-semibold text-sm mb-6 text-center">
              Автоматизированный pipeline обработки заявок
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
              {pipeline.map((step, i) => (
                <div key={step.label} className="flex-1 flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center"
                  >
                    <div className="w-6 h-6 rounded-lg accent-gradient flex items-center justify-center mx-auto mb-2 text-white text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <p className="text-text-primary text-xs font-semibold leading-tight mb-0.5">
                      {step.label}
                    </p>
                    <p className="text-text-muted text-[10px] leading-tight">{step.sublabel}</p>
                  </motion.div>
                  {i < pipeline.length - 1 && (
                    <div className="hidden sm:block w-4 h-px bg-gradient-to-r from-accent/30 to-accent/10 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
