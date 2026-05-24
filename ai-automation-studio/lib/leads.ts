import { z } from "zod"

export const leadSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().regex(/^\+?[\d\s\-()]{7,20}$/, "Введите корректный номер"),
  email: z.string().email("Введите корректный email").optional(),
  business: z.string().optional(),
  businessSize: z.string().optional(),
  whatsapp: z.string().optional(),
  problems: z.array(z.string()).optional(),
  source: z.enum(["contact", "consultant", "audit", "calculator"]),
  consultantData: z.record(z.string(), z.unknown()).optional(),
  auditData: z.record(z.string(), z.unknown()).optional(),
  calculatorData: z.record(z.string(), z.unknown()).optional(),
})

export type Lead = z.infer<typeof leadSchema>

export type LeadQuality = "hot" | "warm" | "cold"

export function calculateLeadScore(lead: Partial<Lead>): { score: number; quality: LeadQuality } {
  let score = 0
  if (lead.name) score += 10
  if (lead.phone) score += 20
  if (lead.email) score += 10
  if (lead.business) score += 15
  if (lead.whatsapp) score += 10
  if (lead.problems && lead.problems.length > 0) score += 5 * Math.min(lead.problems.length, 5)
  if (lead.source === "consultant") score += 10
  if (lead.source === "audit") score += 15
  if (lead.consultantData && Object.keys(lead.consultantData).length > 3) score += 10
  if (lead.auditData && Object.keys(lead.auditData).length > 3) score += 10

  const finalScore = Math.min(score, 100)
  const quality: LeadQuality = finalScore >= 70 ? "hot" : finalScore >= 40 ? "warm" : "cold"

  return { score: finalScore, quality }
}

export function formatLeadForTelegram(lead: Lead, quality: LeadQuality, score: number): string {
  const emoji = quality === "hot" ? "\u{1F525}" : quality === "warm" ? "\u{1F7E1}" : "\u{1F535}"
  const sourceMap: Record<string, string> = {
    contact: "\u{1F4E9} Форма контактов",
    consultant: "\u{1F916} AI-консультант",
    audit: "\u{1F50D} AI-аудит",
    calculator: "\u{1F4CA} ROI-калькулятор",
  }

  let msg = `${emoji} <b>Новая заявка — ${quality.toUpperCase()}</b>\n\n`
  msg += `\u{1F464} <b>${lead.name}</b>\n`
  msg += `\u{1F4DE} ${lead.phone}\n`
  if (lead.email) msg += `\u{1F4E7} ${lead.email}\n`
  if (lead.whatsapp) msg += `\u{1F4AC} WhatsApp: ${lead.whatsapp}\n`
  if (lead.business) msg += `\u{1F3E2} ${lead.business}\n`
  if (lead.businessSize) msg += `\u{1F4CA} Размер: ${lead.businessSize}\n`
  msg += `\n\u{1F4CD} ${sourceMap[lead.source] || lead.source}\n`
  msg += `\u{2B50} Качество: ${score}/100\n`

  if (lead.problems && lead.problems.length > 0) {
    msg += `\n\u{26A0}\u{FE0F} <b>Проблемы:</b>\n`
    lead.problems.forEach((p) => {
      msg += `\u{2022} ${p}\n`
    })
  }

  if (lead.consultantData) {
    msg += `\n\u{1F916} <b>Данные AI-консультации:</b>\n`
    Object.entries(lead.consultantData).forEach(([k, v]) => {
      const val = Array.isArray(v) ? (v as string[]).join(", ") : String(v)
      msg += `\u{2022} ${k}: ${val}\n`
    })
  }

  if (lead.auditData) {
    msg += `\n\u{1F50D} <b>Данные AI-аудита:</b>\n`
    Object.entries(lead.auditData).forEach(([k, v]) => {
      const val = Array.isArray(v) ? (v as string[]).join(", ") : String(v)
      msg += `\u{2022} ${k}: ${val}\n`
    })
  }

  return msg
}
