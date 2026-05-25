import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, ADMIN_COOKIE } from "@/lib/admin-auth"

async function checkAuth() {
  const c = await cookies()
  const token = c.get(ADMIN_COOKIE)?.value
  return token ? verifyToken(token) : false
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    integrations: {
      supabase: {
        configured: !!(
          process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.SUPABASE_SERVICE_ROLE_KEY
        ),
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
      },
      telegram: {
        configured: !!(
          process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
        ),
        chatId: process.env.TELEGRAM_CHAT_ID || null,
      },
      n8n: {
        configured: !!process.env.N8N_WEBHOOK_URL,
      },
    },
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aiautomation.studio",
  })
}
