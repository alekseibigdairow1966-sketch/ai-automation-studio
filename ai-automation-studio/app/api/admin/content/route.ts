import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, ADMIN_COOKIE } from "@/lib/admin-auth"
import { readStore, writeStore } from "@/lib/content-store"

async function checkAuth() {
  const c = await cookies()
  const token = c.get(ADMIN_COOKIE)?.value
  return token ? verifyToken(token) : false
}

const CONTENT_DEFAULTS: Record<string, unknown> = {
  hero: {
    badge: "Операционная AI-платформа",
    title: "AI-инфраструктура для",
    titleAccent: "сервисного бизнеса",
    subtitle:
      "Автоматизируем приём заявок, маршрутизацию, коммуникацию с клиентами и контроль операций. Без хаоса, без потерянных обращений.",
    stats: [
      { value: "0%", label: "потерянных заявок" },
      { value: "-80%", label: "ручной работы" },
      { value: "24/7", label: "без выходных" },
    ],
  },
  cta: {
    title: "Готовы к операционной автоматизации?",
    subtitle:
      "Расскажите о вашем сервисном центре — проведём аудит процессов и покажем, где AI сократит хаос",
    buttonText: "Обсудить проект",
  },
}

export async function GET(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const key = searchParams.get("key")

  if (key) {
    const data = await readStore(`content_${key}`, CONTENT_DEFAULTS[key] || {})
    return NextResponse.json(data)
  }

  const result: Record<string, unknown> = {}
  for (const k of Object.keys(CONTENT_DEFAULTS)) {
    result[k] = await readStore(`content_${k}`, CONTENT_DEFAULTS[k])
  }
  return NextResponse.json(result)
}

export async function PUT(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { key, data } = await req.json()
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 })
  }
  await writeStore(`content_${key}`, data)
  return NextResponse.json({ ok: true })
}
