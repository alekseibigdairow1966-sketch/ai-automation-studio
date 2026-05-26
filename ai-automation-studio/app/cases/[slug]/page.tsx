import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, X, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cases as defaultCases } from "@/data/cases"
import { readStore } from "@/lib/content-store"
import { CaseWorkflow } from "./case-workflow"
import { getServerLocale, getTranslations } from "@/lib/i18n-server"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cases = await readStore("cases", defaultCases)
  return cases.filter((c: { published: boolean }) => c.published).map((c: { slug: string }) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cases = await readStore("cases", defaultCases)
  const cs = cases.find((c: { slug: string }) => c.slug === slug)
  if (!cs) return {}
  return {
    title: `${cs.title} — ServiceLayer`,
    description: cs.description,
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const cases = await readStore("cases", defaultCases)
  const locale = await getServerLocale()
  const t = getTranslations(locale)
  const cs = cases.find((c: { slug: string; published: boolean }) => c.slug === slug && c.published)
  if (!cs) notFound()

  const inefficiencyList = cs.inefficiencies.split(". ").filter(Boolean).map((s) => s.replace(/\.$/, ""))
  const solutionSentences = cs.solution.split(". ").filter(Boolean).map((s) => s.replace(/\.$/, ""))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Back */}
      <Link href="/cases" className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8">
        <ArrowLeft size={14} /> {t.caseDetail.allCases}
      </Link>

      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-0">
            {cs.industry}
          </Badge>
          <span className="text-text-muted text-xs">
            {new Date(cs.created_at).toLocaleDateString(locale === "kk" ? "kk-KZ" : "ru-RU", { year: "numeric", month: "long" })}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">{cs.title}</h1>
        <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-3xl">{cs.description}</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {cs.technologies.map((tech) => (
            <span key={tech} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-text-muted border border-white/[0.06] font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Results — top position for impact */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-success block" />
          {t.caseDetail.results}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cs.results.map((r) => (
            <div key={r.metric} className="glass-panel p-5 text-center hover-glow">
              <p className="text-text-muted text-xs mb-3">{r.metric}</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-red-400/70 text-sm line-through">{r.before}</span>
                <ArrowRight size={12} className="text-text-muted" />
              </div>
              <span className="text-lg sm:text-2xl lg:text-3xl font-bold accent-gradient-text break-words">{r.after}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-red-500 block" />
          {t.caseDetail.problem}
        </h2>
        <div className="glass-panel p-6 sm:p-8">
          <p className="text-text-secondary leading-relaxed text-base">{cs.problem}</p>
        </div>
      </section>

      {/* Inefficiencies — before state */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-red-500 block" />
          {t.caseDetail.inefficiencies}
        </h2>
        <div className="glass-panel p-6 sm:p-8 border-red-500/10">
          <div className="space-y-3">
            {inefficiencyList.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <X size={14} className="text-red-400 mt-1 shrink-0" />
                <p className="text-text-muted text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full accent-gradient block" />
          {t.caseDetail.solution}
        </h2>
        <div className="glass-panel p-6 sm:p-8 border-accent/10">
          <div className="space-y-3">
            {solutionSentences.map((sentence, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={14} className="text-accent mt-1 shrink-0" />
                <p className="text-text-secondary text-sm leading-relaxed">{sentence}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture / Workflow */}
      {cs.architecture && (
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full accent-gradient block" />
            {t.caseDetail.architecture}
          </h2>
          <CaseWorkflow
            nodes={cs.architecture.nodes}
            edges={cs.architecture.edges}
          />
        </section>
      )}

      {/* Before / After comparison */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full accent-gradient block" />
          {t.caseDetail.beforeAfter}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-6 border-red-500/10">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <X size={16} className="text-red-400" />
              </div>
              <h3 className="font-semibold text-text-primary text-sm">{t.caseDetail.before}</h3>
            </div>
            <div className="space-y-3">
              {cs.results.map((r) => (
                <div key={r.metric} className="flex items-center justify-between">
                  <span className="text-text-muted text-xs">{r.metric}</span>
                  <span className="text-red-400 text-sm font-medium">{r.before}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-6 border-accent/20">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Check size={16} className="text-accent" />
              </div>
              <h3 className="font-semibold text-text-primary text-sm">{t.caseDetail.after}</h3>
            </div>
            <div className="space-y-3">
              {cs.results.map((r) => (
                <div key={r.metric} className="flex items-center justify-between">
                  <span className="text-text-muted text-xs">{r.metric}</span>
                  <span className="text-accent text-sm font-semibold">{r.after}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl p-8 sm:p-12 text-center animate-gradient-shift" style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED, #8B5CF6, #6366F1)", backgroundSize: "200% 200%" }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t.caseDetail.wantSame}</h2>
        <p className="text-white/70 mb-6 max-w-lg mx-auto">{t.caseDetail.wantSameDesc}</p>
        <Link href="/contact">
          <Button size="lg" className="bg-white text-accent font-medium px-8 hover:bg-white/90">
            {t.nav.discuss} <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
