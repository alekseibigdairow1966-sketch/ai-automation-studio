import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cases } from "@/data/cases"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return cases.filter((c) => c.published).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = cases.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.description,
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const cs = cases.find((c) => c.slug === slug && c.published)
  if (!cs) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Back */}
      <Link href="/cases" className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8">
        <ArrowLeft size={14} /> Все кейсы
      </Link>

      {/* Header */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4 text-xs bg-accent/10 text-accent border-0">
          {cs.industry}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{cs.title}</h1>
        <p className="text-text-secondary text-lg">{cs.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {cs.technologies.map((tech) => (
            <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-muted border border-white/[0.06]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Problem */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full accent-gradient block" />
          Проблема
        </h2>
        <div className="glass-panel p-6">
          <p className="text-text-secondary leading-relaxed">{cs.problem}</p>
        </div>
      </section>

      {/* Inefficiencies */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-red-500 block" />
          Неэффективности
        </h2>
        <div className="glass-panel p-6">
          <ul className="space-y-2">
            {cs.inefficiencies.split(". ").filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                <span className="text-red-400 mt-0.5">&bull;</span>
                {item.replace(/\.$/, "")}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full accent-gradient block" />
          Решение
        </h2>
        <div className="glass-panel p-6">
          <p className="text-text-secondary leading-relaxed">{cs.solution}</p>
        </div>
      </section>

      {/* Results */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-success block" />
          Результаты
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {cs.results.map((r) => (
            <div key={r.metric} className="glass-panel p-5">
              <p className="text-text-muted text-xs mb-2">{r.metric}</p>
              <div className="flex items-center gap-3">
                <span className="text-red-400 text-sm line-through">{r.before}</span>
                <ArrowRight size={12} className="text-text-muted" />
                <span className="text-accent font-semibold text-lg">{r.after}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="accent-gradient rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Хотите такое же решение?</h2>
        <p className="text-white/70 mb-6">Обсудим вашу задачу и подберём подходящую архитектуру</p>
        <Link href="/contact">
          <Button size="lg" className="bg-white text-accent font-medium px-8 hover:bg-white/90">
            Обсудить проект <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
