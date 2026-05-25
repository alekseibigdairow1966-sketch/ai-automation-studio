"use client"

import { useState, useEffect } from "react"
import { Phone, Save, Loader2, CheckCircle2, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ContactData {
  companyName: string
  companyNameRu: string
  description: string
  phones: { display: string; raw: string }[]
  email: string
  address: { city: string; street: string; full: string; mapUrl: string }
  social: { whatsapp: string; telegram: string; instagram: string }
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
    short: string
  }
}

export default function ContactsPage() {
  const [data, setData] = useState<ContactData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    if (!data) return
    setSaving(true)
    await fetch("/api/admin/contacts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const update = (path: string, value: string) => {
    if (!data) return
    const copy = JSON.parse(JSON.stringify(data)) as Record<string, unknown>
    const keys = path.split(".")
    let obj: Record<string, unknown> = copy
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>
    }
    obj[keys[keys.length - 1]] = value
    setData(copy as unknown as ContactData)
  }

  const addPhone = () => {
    if (!data) return
    setData({ ...data, phones: [...data.phones, { display: "", raw: "" }] })
  }

  const removePhone = (index: number) => {
    if (!data) return
    setData({ ...data, phones: data.phones.filter((_, i) => i !== index) })
  }

  const updatePhone = (
    index: number,
    field: "display" | "raw",
    value: string,
  ) => {
    if (!data) return
    const phones = [...data.phones]
    phones[index] = { ...phones[index], [field]: value }
    setData({ ...data, phones })
  }

  if (!data) {
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
          <Phone size={24} className="text-accent" />
          <h1 className="text-2xl font-bold text-text-primary">Контакты</h1>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="accent-gradient text-white"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : saved ? (
            <>
              <CheckCircle2 size={16} className="mr-1.5" /> Сохранено
            </>
          ) : (
            <>
              <Save size={16} className="mr-1.5" /> Сохранить
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company */}
        <Section title="Компания">
          <Field
            label="Название (EN)"
            value={data.companyName}
            onChange={(v) => update("companyName", v)}
          />
          <Field
            label="Название (RU)"
            value={data.companyNameRu}
            onChange={(v) => update("companyNameRu", v)}
          />
          <Field
            label="Описание"
            value={data.description}
            onChange={(v) => update("description", v)}
          />
        </Section>

        {/* Phones */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-text-primary font-semibold">Телефоны</h2>
            <button
              onClick={addPhone}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-3">
            {data.phones.map((phone, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-text-muted text-xs mb-1 block">
                    Отображение
                  </label>
                  <Input
                    value={phone.display}
                    onChange={(e) => updatePhone(i, "display", e.target.value)}
                    className="bg-background border-white/[0.06] text-text-primary text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-text-muted text-xs mb-1 block">
                    Номер
                  </label>
                  <Input
                    value={phone.raw}
                    onChange={(e) => updatePhone(i, "raw", e.target.value)}
                    className="bg-background border-white/[0.06] text-text-primary text-sm"
                  />
                </div>
                <button
                  onClick={() => removePhone(i)}
                  className="text-text-muted hover:text-red-400 transition-colors p-2 mb-0.5"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <Section title="Адрес">
          <Field
            label="Город"
            value={data.address.city}
            onChange={(v) => update("address.city", v)}
          />
          <Field
            label="Улица"
            value={data.address.street}
            onChange={(v) => update("address.street", v)}
          />
          <Field
            label="Полный адрес"
            value={data.address.full}
            onChange={(v) => update("address.full", v)}
          />
          <Field
            label="Ссылка на карту"
            value={data.address.mapUrl}
            onChange={(v) => update("address.mapUrl", v)}
          />
        </Section>

        {/* Email */}
        <Section title="Email и соцсети">
          <Field
            label="Email"
            value={data.email}
            onChange={(v) => update("email", v)}
          />
          <Field
            label="WhatsApp"
            value={data.social.whatsapp}
            onChange={(v) => update("social.whatsapp", v)}
          />
          <Field
            label="Telegram"
            value={data.social.telegram}
            onChange={(v) => update("social.telegram", v)}
          />
          <Field
            label="Instagram"
            value={data.social.instagram}
            onChange={(v) => update("social.instagram", v)}
          />
        </Section>

        {/* Working Hours */}
        <Section title="Режим работы">
          <Field
            label="Будни"
            value={data.workingHours.weekdays}
            onChange={(v) => update("workingHours.weekdays", v)}
          />
          <Field
            label="Суббота"
            value={data.workingHours.saturday}
            onChange={(v) => update("workingHours.saturday", v)}
          />
          <Field
            label="Воскресенье"
            value={data.workingHours.sunday}
            onChange={(v) => update("workingHours.sunday", v)}
          />
          <Field
            label="Краткое"
            value={data.workingHours.short}
            onChange={(v) => update("workingHours.short", v)}
          />
        </Section>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="glass-panel p-6">
      <h2 className="text-text-primary font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

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
