"use client"

import { useState, useEffect } from "react"
import {
  Layers,
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

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  useCases: string[]
}

const AVAILABLE_ICONS = [
  "Headphones", "MessageCircle", "Database", "GitBranch",
  "BarChart3", "Workflow", "Bot", "Zap", "Shield", "Globe",
]

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceItem[] | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then(setServices)
  }, [])

  const save = async () => {
    if (!services) return
    setSaving(true)
    await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(services),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const addService = () => {
    if (!services) return
    const svc: ServiceItem = {
      id: String(Date.now()),
      title: "Новая услуга",
      description: "",
      icon: "Workflow",
      features: [],
      useCases: [],
    }
    setServices([...services, svc])
    setOpenId(svc.id)
  }

  const updateService = (id: string, patch: Partial<ServiceItem>) => {
    if (!services) return
    setServices(services.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  const removeService = (id: string) => {
    if (!services) return
    setServices(services.filter((s) => s.id !== id))
    if (openId === id) setOpenId(null)
  }

  if (!services) {
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
          <Layers size={24} className="text-accent" />
          <h1 className="text-2xl font-bold text-text-primary">Услуги</h1>
          <span className="text-text-muted text-sm">({services.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={addService} size="sm" variant="outline" className="text-xs border-white/[0.06] text-text-secondary hover:text-text-primary">
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
        {services.map((svc) => {
          const isOpen = openId === svc.id
          return (
            <div key={svc.id} className="glass-panel overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setOpenId(isOpen ? null : svc.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
              >
                <GripVertical size={14} className="text-text-muted/40 shrink-0" />
                {isOpen ? <ChevronDown size={16} className="text-accent shrink-0" /> : <ChevronRight size={16} className="text-text-muted shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm font-medium truncate">{svc.title}</p>
                  <p className="text-text-muted text-xs truncate">Иконка: {svc.icon} &middot; {svc.features.length} фич</p>
                </div>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-4 pb-5 border-t border-white/[0.04] pt-4 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Field label="Заголовок" value={svc.title} onChange={(v) => updateService(svc.id, { title: v })} />
                    <div>
                      <label className="text-text-muted text-xs mb-1.5 block">Иконка</label>
                      <select
                        value={svc.icon}
                        onChange={(e) => updateService(svc.id, { icon: e.target.value })}
                        className="w-full h-9 rounded-md border border-white/[0.06] bg-background text-text-primary text-sm px-3"
                      >
                        {AVAILABLE_ICONS.map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-text-muted text-xs mb-1.5 block">Описание</label>
                    <Textarea value={svc.description} onChange={(e) => updateService(svc.id, { description: e.target.value })} rows={3} className="resize-none bg-background border-white/[0.06] text-text-primary text-sm" />
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-text-secondary text-xs font-medium">Возможности</span>
                      <button
                        onClick={() => updateService(svc.id, { features: [...svc.features, ""] })}
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {svc.features.map((f, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Input
                            value={f}
                            onChange={(e) => {
                              const features = [...svc.features]
                              features[i] = e.target.value
                              updateService(svc.id, { features })
                            }}
                            placeholder="Описание возможности"
                            className="bg-background border-white/[0.06] text-text-primary text-sm flex-1"
                          />
                          <button
                            onClick={() => updateService(svc.id, { features: svc.features.filter((_, j) => j !== i) })}
                            className="text-text-muted hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-text-secondary text-xs font-medium">Для кого</span>
                      <button
                        onClick={() => updateService(svc.id, { useCases: [...svc.useCases, ""] })}
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {svc.useCases.map((uc, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Input
                            value={uc}
                            onChange={(e) => {
                              const useCases = [...svc.useCases]
                              useCases[i] = e.target.value
                              updateService(svc.id, { useCases })
                            }}
                            placeholder="Целевая аудитория"
                            className="bg-background border-white/[0.06] text-text-primary text-sm flex-1"
                          />
                          <button
                            onClick={() => updateService(svc.id, { useCases: svc.useCases.filter((_, j) => j !== i) })}
                            className="text-text-muted hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delete */}
                  <div className="flex justify-end pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={() => removeService(svc.id)}
                      className="text-text-muted hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={12} /> Удалить услугу
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {services.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <Layers size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Услуг пока нет</p>
          <button onClick={addService} className="text-accent text-sm mt-2 hover:underline">
            Добавить первую услугу
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
