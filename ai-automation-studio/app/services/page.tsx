import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/data/services"

export const metadata: Metadata = {
  title: "Услуги AI-автоматизации",
  description: "AI Receptionist, WhatsApp AI, CRM Automation, n8n Workflows и другие услуги AI-автоматизации для бизнеса.",
}

const ICON_MAP: Record<string, React.ElementType> = {
  Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy, Building2,
}

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-20">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Услуги</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Что мы автоматизируем</h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Полный стек AI-автоматизации для сервисного бизнеса
        </p>
      </div>

      <div className="space-y-16">
        {services.map((svc, i) => {
          const Icon = ICON_MAP[svc.icon] ?? Bot
          const isEven = i % 2 === 1
          return (
            <section key={svc.id} className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}>
              {/* Visual */}
              <div className="w-full md:w-2/5 shrink-0">
                <div className="glass-panel p-10 flex items-center justify-center aspect-square max-w-xs mx-auto">
                  <div className="w-20 h-20 rounded-2xl accent-gradient flex items-center justify-center">
                    <Icon size={36} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-3">{svc.title}</h2>
                <p className="text-text-secondary mb-6 leading-relaxed">{svc.description}</p>

                <div className="mb-6">
                  <p className="text-text-primary text-sm font-medium mb-3">Ключевые возможности</p>
                  <div className="space-y-2">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" />
                        <span className="text-text-muted text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-text-primary text-sm font-medium mb-2">Для кого</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.useCases.map((uc) => (
                      <span key={uc} className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-muted border border-white/[0.06]">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/contact">
                  <Button className="accent-gradient text-white font-medium hover:opacity-90">
                    Обсудить внедрение <ArrowRight size={14} className="ml-1.5" />
                  </Button>
                </Link>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
