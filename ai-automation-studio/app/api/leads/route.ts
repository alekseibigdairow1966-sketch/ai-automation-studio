import { NextResponse } from "next/server"
import { leadSchema, calculateLeadScore, formatLeadForTelegram } from "@/lib/leads"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    /* ---- validate ---- */
    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", details: parsed.error.issues },
        { status: 400 },
      )
    }

    const lead = parsed.data
    const { score, quality } = calculateLeadScore(lead)

    /* ---- Supabase (optional) ---- */
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            ...lead,
            quality_score: score,
            quality,
            created_at: new Date().toISOString(),
          }),
        })
      } catch {
        console.warn("[leads] Supabase insert failed — continuing")
      }
    }

    /* ---- Telegram notification (optional) ---- */
    const tgToken = process.env.TELEGRAM_BOT_TOKEN
    const tgChat = process.env.TELEGRAM_CHAT_ID
    if (tgToken && tgChat) {
      try {
        const text = formatLeadForTelegram(lead, quality, score)
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChat,
            text,
            parse_mode: "HTML",
          }),
        })
      } catch {
        console.warn("[leads] Telegram notification failed — continuing")
      }
    }

    /* ---- n8n webhook (optional) ---- */
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, quality_score: score, quality }),
        })
      } catch {
        console.warn("[leads] n8n webhook failed — continuing")
      }
    }

    return NextResponse.json({ ok: true, score, quality })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}
