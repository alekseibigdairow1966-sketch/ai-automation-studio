"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/components/admin/admin-shell"
import {
  Lock,
  Users,
  Flame,
  TrendingUp,
  BarChart3,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

/* ================================================================== */
/*  Root admin page — shows login form or dashboard                    */
/* ================================================================== */

export default function AdminPage() {
  const { authenticated } = useAdmin()
  if (!authenticated) return <LoginForm />
  return <Dashboard />
}

/* ------------------------------------------------------------------ */
/*  Login                                                              */
/* ------------------------------------------------------------------ */

function LoginForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.ok) {
        window.location.reload()
      } else {
        setError(data.error || "Ошибка входа")
      }
    } catch {
      setError("Ошибка сети")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl accent-gradient flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
            AI
          </div>
          <h1 className="text-xl font-bold text-text-primary">Админ-панель</h1>
          <p className="text-text-muted text-sm mt-1">AIAutomation Studio</p>
        </div>
        <form onSubmit={handleLogin} className="glass-panel p-6 space-y-4">
          <div>
            <label className="text-text-secondary text-xs mb-1.5 block">
              Пароль
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-background border-white/[0.06] text-text-primary"
                placeholder="Введите пароль"
                autoFocus
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full accent-gradient text-white"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Войти"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

interface LeadRecord {
  id?: string
  name?: string
  phone?: string
  email?: string
  source?: string
  quality?: string
  quality_score?: number
  created_at?: string
}

function Dashboard() {
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((d) => {
        setLeads(Array.isArray(d) ? d : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const total = leads.length
  const hot = leads.filter((l) => l.quality === "hot").length
  const warm = leads.filter((l) => l.quality === "warm").length
  const today = leads.filter((l) => {
    if (!l.created_at) return false
    return new Date(l.created_at).toDateString() === new Date().toDateString()
  }).length

  const stats = [
    { icon: Users, label: "Всего заявок", value: total, color: "text-accent" },
    { icon: Flame, label: "Горячие", value: hot, color: "text-red-400" },
    {
      icon: TrendingUp,
      label: "Тёплые",
      value: warm,
      color: "text-amber-400",
    },
    {
      icon: BarChart3,
      label: "Сегодня",
      value: today,
      color: "text-green-400",
    },
  ]

  const sourceLabels: Record<string, string> = {
    contact: "Форма",
    consultant: "AI-консультант",
    audit: "AI-аудит",
    calculator: "Калькулятор",
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Дашборд</h1>
        <Link href="/admin/leads">
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-text-secondary text-xs"
          >
            Все заявки
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="animate-spin text-accent" />
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="glass-panel p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center ${s.color}`}
                  >
                    <s.icon size={20} />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">{s.label}</p>
                    <p className="text-text-primary text-2xl font-bold">
                      {s.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent leads */}
          <div className="glass-panel p-6">
            <h2 className="text-text-primary font-semibold mb-4">
              Последние заявки
            </h2>
            {leads.length === 0 ? (
              <p className="text-text-muted text-sm py-8 text-center">
                Заявок пока нет. Они появятся после первой отправки формы на
                сайте.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left text-text-muted text-xs font-medium pb-3">
                        Имя
                      </th>
                      <th className="text-left text-text-muted text-xs font-medium pb-3">
                        Телефон
                      </th>
                      <th className="text-left text-text-muted text-xs font-medium pb-3 hidden sm:table-cell">
                        Источник
                      </th>
                      <th className="text-left text-text-muted text-xs font-medium pb-3">
                        Качество
                      </th>
                      <th className="text-left text-text-muted text-xs font-medium pb-3 hidden md:table-cell">
                        Дата
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice(0, 10).map((lead, i) => (
                      <tr
                        key={lead.id || i}
                        className="border-b border-white/[0.04]"
                      >
                        <td className="py-3 text-text-primary">{lead.name}</td>
                        <td className="py-3 text-text-secondary">
                          {lead.phone}
                        </td>
                        <td className="py-3 hidden sm:table-cell">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                            {sourceLabels[lead.source || ""] || lead.source}
                          </span>
                        </td>
                        <td className="py-3">
                          <QualityBadge quality={lead.quality || "cold"} />
                        </td>
                        <td className="py-3 text-text-muted text-xs hidden md:table-cell">
                          {lead.created_at
                            ? new Date(lead.created_at).toLocaleDateString(
                                "ru-RU",
                              )
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */

function QualityBadge({ quality }: { quality: string }) {
  const styles: Record<string, string> = {
    hot: "bg-red-400/10 text-red-400",
    warm: "bg-amber-400/10 text-amber-400",
    cold: "bg-blue-400/10 text-blue-400",
  }
  const labels: Record<string, string> = {
    hot: "Горячий",
    warm: "Тёплый",
    cold: "Холодный",
  }
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${styles[quality] || styles.cold}`}
    >
      {labels[quality] || quality}
    </span>
  )
}
