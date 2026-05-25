import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, ADMIN_COOKIE } from "@/lib/admin-auth"
import { readStore, writeStore } from "@/lib/content-store"

async function checkAuth() {
  const c = await cookies()
  const token = c.get(ADMIN_COOKIE)?.value
  return token ? verifyToken(token) : false
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const leads = await readStore("leads", [])
  return NextResponse.json(leads)
}

export async function DELETE(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  const leads = await readStore<Record<string, unknown>[]>("leads", [])
  const filtered = leads.filter((l) => l.id !== id)
  await writeStore("leads", filtered)
  return NextResponse.json({ ok: true })
}
