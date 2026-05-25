"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Save,
  Loader2,
  CheckCircle2,
  Plus,
  Trash2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface HeroContent {
  badge: string
  title: string
  titleAccent: string
  subtitle: string
  stats: { value: string; label: string }[]
}

interface CTAContent {
  title: string
  subtitle: string
  buttonText: string
}

export default function ContentPage() {
  const [hero, setHero] = useState<HeroContent | null>(null)
  const [cta, setCta] = useState<CTAContent | null>(null)
  const [saving, setSaving] = useState("")
  const [saved, setSaved] = useState("")

  useEffect(() => {
    fetch("/api/admin/content?key=hero")
      .then((r) => r.json())
      .then(setHero)
    fetch("/api/admin/content?key=cta")
      .then((r) => r.json())
      .then(setCta)
  }, [])

  const save = async (key: string, data: unknown) => {
    setSaving(key)
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, data }),
    })
    setSaving("")
    setSaved(key)
    setTimeout(() => setSaved(""), 3000)
  }

  const SaveBtn = ({ k, data }: { k: string; data: unknown }) => (
    <Button
      onClick={() => save(k, data)}
      disabled={saving === k}
      size="sm"
      className="accent-gradient text-white text-xs"
    >
      {saving === k ? (
        <Loader2 size={14} className="animate-spin" />
      ) : saved === k ? (
        <>
          <CheckCircle2 size={14} className="mr-1" /> Сохранено
        </>
      ) : (
        <>
          <Save size={14} className="mr-1" /> Сохранить
        </>
      )}
    </Button>
  )

  if (!hero || !cta) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <FileText size={24} className="text-accent" />
        <h1 className="text-2xl font-bold text-text-primary">Контент</h1>
      </div>

      <div className="space-y-6">
        {/* Hero */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-text-primary font-semibold">Hero секция</h2>
            <SaveBtn k="hero" data={hero} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Field
              label="Бейдж"
              value={hero.badge}
              onChange={(v) => setHero({ ...hero, badge: v })}
            />
            <Field
              label="Заголовок (начало)"
              value={hero.title}
              onChange={(v) => setHero({ ...hero, title: v })}
            />
            <Field
              label="Заголовок (акцент)"
              value={hero.titleAccent}
              onChange={(v) => setHero({ ...hero, titleAccent: v })}
            />
            <div className="lg:col-span-2">
              <label className="text-text-muted text-xs mb-1.5 block">
                Подзаголовок
              </label>
              <Textarea
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                rows={3}
                className="resize-none bg-background border-white/[0.06] text-text-primary text-sm"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-xs font-medium">
                Статистика
              </span>
              <button
                onClick={() =>
                  setHero({
                    ...hero,
                    stats: [...hero.stats, { value: "", label: "" }],
                  })
                }
                className="text-accent hover:text-accent/80 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {hero.stats.map((stat, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...hero.stats]
                      stats[i] = { ...stats[i], value: e.target.value }
                      setHero({ ...hero, stats })
                    }}
                    placeholder="Значение"
                    className="bg-background border-white/[0.06] text-text-primary text-sm flex-1"
                  />
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...hero.stats]
                      stats[i] = { ...stats[i], label: e.target.value }
                      setHero({ ...hero, stats })
                    }}
                    placeholder="Подпись"
                    className="bg-background border-white/[0.06] text-text-primary text-sm flex-1"
                  />
                  <button
                    onClick={() =>
                      setHero({
                        ...hero,
                        stats: hero.stats.filter((_, j) => j !== i),
                      })
                    }
                    className="text-text-muted hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-text-primary font-semibold">CTA секция</h2>
            <SaveBtn k="cta" data={cta} />
          </div>
          <div className="space-y-4">
            <Field
              label="Заголовок"
              value={cta.title}
              onChange={(v) => setCta({ ...cta, title: v })}
            />
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">
                Подзаголовок
              </label>
              <Textarea
                value={cta.subtitle}
                onChange={(e) => setCta({ ...cta, subtitle: e.target.value })}
                rows={2}
                className="resize-none bg-background border-white/[0.06] text-text-primary text-sm"
              />
            </div>
            <Field
              label="Текст кнопки"
              value={cta.buttonText}
              onChange={(v) => setCta({ ...cta, buttonText: v })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="text-text-muted text-xs mb-1.5 block">{label}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-background border-white/[0.06] text-text-primary text-sm"
      />
    </div>
  )
}
