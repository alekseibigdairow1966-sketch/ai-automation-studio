"use client"

import { Fragment, useState, useEffect } from "react"
import {
  Users,
  Trash2,
  Search,
  Loader2,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface LeadRecord {
  id?: string
  name?: string
  phone?: string
  email?: string
  whatsapp?: string
  business?: string
  businessSize?: string
  source?: string
  quality?: string
  quality_score?: number
  problems?: string[]
  consultantData?: Record<string, unknown>
  auditData?: Record<string, unknown>
  created_at?: string
}

const SOURCE_LABELS: Record<string, string> = {
  contact: "Форма",
  consultant: "AI-консультант",
  audit: "AI-аудит",
  calculator: "Калькулятор",
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterSource, setFilterSource] = useState("all")
  const [filterQuality, setFilterQuality] = useState("all")
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchLeads = () => {
    setLoading(true)
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((d) => {
        setLeads(Array.isArray(d) ? d : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить заявку?")) return
    await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" })
    fetchLeads()
  }

  const exportCSV = () => {
    const headers = [
      "Имя",
      "Телефон",
      "Email",
      "WhatsApp",
      "Бизнес",
      "Источник",
      "Качество",
      "Балл",
      "Проблемы",
      "Дата",
    ]
    const rows = leads.map((l) => [
      l.name || "",
      l.phone || "",
      l.email || "",
      l.whatsapp || "",
      l.business || "",
      SOURCE_LABELS[l.source || ""] || l.source || "",
      l.quality || "",
      String(l.quality_score || 0),
      (l.problems || []).join("; "),
      l.created_at || "",
    ])
    const csv =
      [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n")
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = leads.filter((l) => {
    if (filterSource !== "all" && l.source !== filterSource) return false
    if (filterQuality !== "all" && l.quality !== filterQuality) return false
    if (search) {
      const s = search.toLowerCase()
      return (
        l.name?.toLowerCase().includes(s) ||
        l.phone?.includes(s) ||
        l.email?.toLowerCase().includes(s) ||
        l.business?.toLowerCase().includes(s)
      )
    }
    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users size={24} className="text-accent" />
          <h1 className="text-2xl font-bold text-text-primary">Заявки</h1>
          <span className="text-text-muted text-sm">({filtered.length})</span>
        </div>
        {leads.length > 0 && (
          <Button
            onClick={exportCSV}
            variant="outline"
            size="sm"
            className="border-white/10 text-text-secondary text-xs"
          >
            <Download size={14} className="mr-1" /> CSV
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по имени, телефону, email..."
            className="pl-10 bg-background border-white/[0.06] text-text-primary text-sm"
          />
        </div>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="bg-background border border-white/[0.06] text-text-primary text-sm rounded-lg px-3 py-2 outline-none"
        >
          <option value="all">Все источники</option>
          <option value="contact">Форма</option>
          <option value="consultant">AI-консультант</option>
          <option value="audit">AI-аудит</option>
          <option value="calculator">Калькулятор</option>
        </select>
        <select
          value={filterQuality}
          onChange={(e) => setFilterQuality(e.target.value)}
          className="bg-background border border-white/[0.06] text-text-primary text-sm rounded-lg px-3 py-2 outline-none"
        >
          <option value="all">Все</option>
          <option value="hot">Горячие</option>
          <option value="warm">Тёплые</option>
          <option value="cold">Холодные</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="animate-spin text-accent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <p className="text-text-muted">
            {leads.length === 0
              ? "Заявок пока нет. Они появятся после первой отправки формы."
              : "Ничего не найдено по фильтрам."}
          </p>
        </div>
      ) : (
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left text-text-muted text-xs font-medium p-4">
                    Имя
                  </th>
                  <th className="text-left text-text-muted text-xs font-medium p-4">
                    Телефон
                  </th>
                  <th className="text-left text-text-muted text-xs font-medium p-4 hidden md:table-cell">
                    Email
                  </th>
                  <th className="text-left text-text-muted text-xs font-medium p-4">
                    Источник
                  </th>
                  <th className="text-left text-text-muted text-xs font-medium p-4">
                    Качество
                  </th>
                  <th className="text-left text-text-muted text-xs font-medium p-4 hidden lg:table-cell">
                    Дата
                  </th>
                  <th className="p-4 w-20" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  const id = lead.id || String(i)
                  return (
                    <Fragment key={id}>
                      <tr
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer transition-colors"
                        onClick={() =>
                          setExpanded(expanded === id ? null : id)
                        }
                      >
                        <td className="p-4 text-text-primary font-medium">
                          {lead.name}
                        </td>
                        <td className="p-4 text-text-secondary">
                          {lead.phone}
                        </td>
                        <td className="p-4 text-text-secondary hidden md:table-cell">
                          {lead.email || "—"}
                        </td>
                        <td className="p-4">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                            {SOURCE_LABELS[lead.source || ""] || lead.source}
                          </span>
                        </td>
                        <td className="p-4">
                          <QualityBadge quality={lead.quality || "cold"} />
                        </td>
                        <td className="p-4 text-text-muted text-xs hidden lg:table-cell">
                          {lead.created_at
                            ? new Date(lead.created_at).toLocaleString("ru-RU")
                            : "—"}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1">
                            {expanded === id ? (
                              <ChevronUp size={16} className="text-text-muted" />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-text-muted"
                              />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                if (lead.id) handleDelete(lead.id)
                              }}
                              className="text-text-muted hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded === id && (
                        <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                          <td colSpan={7} className="p-4">
                            <LeadDetails lead={lead} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */

function LeadDetails({ lead }: { lead: LeadRecord }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div className="space-y-2">
        <DetailRow label="Имя" value={lead.name} />
        <DetailRow label="Телефон" value={lead.phone} />
        <DetailRow label="Email" value={lead.email} />
        <DetailRow label="WhatsApp" value={lead.whatsapp} />
        <DetailRow label="Бизнес" value={lead.business} />
        <DetailRow label="Размер бизнеса" value={lead.businessSize} />
        <DetailRow
          label="Качество"
          value={
            lead.quality
              ? `${lead.quality} (${lead.quality_score}/100)`
              : undefined
          }
        />
      </div>
      <div className="space-y-2">
        {lead.problems && lead.problems.length > 0 && (
          <div>
            <span className="text-text-muted text-xs">Проблемы:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {lead.problems.map((p) => (
                <span
                  key={p}
                  className="text-xs px-2 py-0.5 rounded bg-white/[0.04] text-text-secondary"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
        {lead.consultantData &&
          Object.keys(lead.consultantData).length > 0 && (
            <div>
              <span className="text-text-muted text-xs">AI-консультация:</span>
              <pre className="text-text-secondary text-xs mt-1 bg-white/[0.02] p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(lead.consultantData, null, 2)}
              </pre>
            </div>
          )}
        {lead.auditData && Object.keys(lead.auditData).length > 0 && (
          <div>
            <span className="text-text-muted text-xs">AI-аудит:</span>
            <pre className="text-text-secondary text-xs mt-1 bg-white/[0.02] p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(lead.auditData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <span className="text-text-muted text-xs">{label}: </span>
      <span className="text-text-primary text-sm">{value}</span>
    </div>
  )
}

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
