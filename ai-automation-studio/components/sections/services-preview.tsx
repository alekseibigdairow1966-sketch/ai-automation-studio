"use client"

import Link from "next/link"
import { ArrowUpRight, Headphones, MessageCircle, GitBranch, Database, BarChart3, Workflow } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const ICONS = [Headphones, MessageCircle, GitBranch, Database, BarChart3, Workflow]

export function ServicesPreview() {
  const { t } = useLocale()

  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">{t.servicesPreview.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            {t.servicesPreview.title}
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.servicesPreview.items.map((svc, i) => {
            const Icon = ICONS[i] ?? Workflow
            return (
              <StaggerItem key={i}>
                <Link href="/services" className="group block glass-panel hover-glow p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                      <Icon size={18} className="text-white" />
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
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
