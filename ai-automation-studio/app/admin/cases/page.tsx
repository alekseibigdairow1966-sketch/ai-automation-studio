"use client"

import { useState, useEffect } from "react"
import {
  Briefcase,
  Save,
  Loader2,
  CheckCircle2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  GripVertical,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CaseResult {
  metric: string
  before: string
  after: string
}

interface CaseItem {
  id: string
  title: string
  slug: string
  description: string
  industry: string
  problem: string
  inefficiencies: string
  solution: string
  technologies: string[]
  results: CaseResult[]
  published: boolean
  created_at: string
}

export default function CasesAdminPage() {
  const [cases, setCases] = useState<CaseItem[] | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/cases")
      .then((r) => r.json())
      .then(setCases)
  }, [])

  const save = async () => {
    if (!cases) return
    setSaving(true)
    await fetch("/api/admin/cases", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cases),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const addCase = () => {
    if (!cases) return
    const newCase: CaseItem = {
      id: String(Date.now()),
      title: "Новый кейс",
      slug: "new-case-" + Date.now(),
      description: "",
      industry: "",
      problem: "",
      inefficiencies: "",
      solution: "",
      technologies: [],
      results: [],
      published: false,
      created_at: new Date().toISOString(),
    }
    setCases([...cases, newCase])
    setOpenId(newCase.id)
  }

  const updateCase = (id: string, patch: Partial<CaseItem>) => {
    if (!cases) return
    setCases(cases.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  const removeCase = (id: string) => {
    if (!cases) return
    setCases(cases.filter((c) => c.id !== id))
    if (openId === id) setOpenId(null)
  }

  if (!cases) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Briefcase size={24} className="text-accent" />
          <h1 className="text-2xl font-bold text-text-primary">Кейсы</h1>
          <span className="text-text-muted text-sm">({cases.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={addCase} size="sm" variant="outline" className="text-xs border-white/[0.06] text-text-secondary hover:text-text-primary">
            <Plus size={14} className="mr-1" /> Добавить
          </Button>
          <Button onClick={save} disabled={saving} size="sm" className="accent-gradient text-white text-xs">
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : saved ? (
              <><CheckCircle2 size={14} className="mr-1" /> Сохранено</>
            ) : (
              <><Save size={14} className="mr-1" /> Сохранить всё</>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {cases.map((cs) => {
          const isOpen = openId === cs.id
          return (
            <div key={cs.id} className="glass-panel overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setOpenId(isOpen ? null : cs.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
              >
                <GripVertical size={14} className="text-text-muted/40 shrink-0" />
                {isOpen ? <ChevronDown size={16} className="text-accent shrink-0" /> : <ChevronRight size={16} className="text-text-muted shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm font-medium truncate">{cs.title}</p>
                  <p className="text-text-muted text-xs truncate">{cs.industry} &middot; {cs.technologies.join(", ")}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${cs.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {cs.published ? "Опубликован" : "Черновик"}
                </span>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-4 pb-5 border-t border-white/[0.04] pt-4 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Field label="Заголовок" value={cs.title} onChange={(v) => updateCase(cs.id, { title: v })} />
                    <Field label="Slug (URL)" value={cs.slug} onChange={(v) => updateCase(cs.id, { slug: v })} />
                    <Field label="Индустрия" value={cs.industry} onChange={(v) => updateCase(cs.id, { industry: v })} />
                    <div>
                      <label className="text-text-muted text-xs mb-1.5 block">Технологии (через запятую)</label>
                      <Input
                        value={cs.technologies.join(", ")}
                        onChange={(e) => updateCase(cs.id, { technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                        className="bg-background border-white/[0.06] text-text-primary text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-text-muted text-xs mb-1.5 block">Описание</label>
                    <Textarea value={cs.description} onChange={(e) => updateCase(cs.id, { description: e.target.value })} rows={2} className="resize-none bg-background border-white/[0.06] text-text-primary text-sm" />
                  </div>

                  <div>
                    <label className="text-text-muted text-xs mb-1.5 block">Проблема</label>
                    <Textarea value={cs.problem} onChange={(e) => updateCase(cs.id, { problem: e.target.value })} rows={3} className="resize-none bg-background border-white/[0.06] text-text-primary text-sm" />
                  </div>

                  <div>
                    <label className="text-text-muted text-xs mb-1.5 block">Операционные неэффективности</label>
                    <Textarea value={cs.inefficiencies} onChange={(e) => updateCase(cs.id, { inefficiencies: e.target.value })} rows={3} className="resize-none bg-background border-white/[0.06] text-text-primary text-sm" />
                  </div>

                  <div>
                    <label className="text-text-muted text-xs mb-1.5 block">Решение</label>
                    <Textarea value={cs.solution} onChange={(e) => updateCase(cs.id, { solution: e.target.value })} rows={4} className="resize-none bg-background border-white/[0.06] text-text-primary text-sm" />
                  </div>

                  {/* Results */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-text-secondary text-xs font-medium">Результаты (до / после)</span>
                      <button
                        onClick={() => updateCase(cs.id, { results: [...cs.results, { metric: "", before: "", after: "" }] })}
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {cs.results.map((r, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Input
                            value={r.metric}
                            onChange={(e) => {
                              const results = [...cs.results]
                              results[i] = { ...results[i], metric: e.target.value }
                              updateCase(cs.id, { results })
                            }}
                            placeholder="Метрика"
                            className="bg-background border-white/[0.06] text-text-primary text-sm flex-1"
                          />
                          <Input
                            value={r.before}
                            onChange={(e) => {
                              const results = [...cs.results]
                              results[i] = { ...results[i], before: e.target.value }
                              updateCase(cs.id, { results })
                            }}
                            placeholder="До"
                            className="bg-background border-white/[0.06] text-text-primary text-sm w-24"
                          />
                          <Input
                            value={r.after}
                            onChange={(e) => {
                              const results = [...cs.results]
                              results[i] = { ...results[i], after: e.target.value }
                              updateCase(cs.id, { results })
                            }}
                            placeholder="После"
                            className="bg-background border-white/[0.06] text-text-primary text-sm w-24"
                          />
                          <button
                            onClick={() => updateCase(cs.id, { results: cs.results.filter((_, j) => j !== i) })}
                            className="text-text-muted hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Published + Delete */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cs.published}
                        onChange={(e) => updateCase(cs.id, { published: e.target.checked })}
                        className="w-4 h-4 rounded border-white/10 bg-background text-accent focus:ring-accent"
                      />
                      <span className="text-text-secondary text-xs">Опубликован</span>
                    </label>
                    <button
                      onClick={() => removeCase(cs.id)}
                      className="text-text-muted hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={12} /> Удалить кейс
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {cases.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Кейсов пока нет</p>
          <button onClick={addCase} className="text-accent text-sm mt-2 hover:underline">
            Добавить первый кейс
          </button>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-text-muted text-xs mb-1.5 block">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-background border-white/[0.06] text-text-primary text-sm" />
    </div>
  )
}
