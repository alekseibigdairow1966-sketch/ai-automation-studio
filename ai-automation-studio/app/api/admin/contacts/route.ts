import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, ADMIN_COOKIE } from "@/lib/admin-auth"
import { readStore, writeStore } from "@/lib/content-store"
import { CONTACTS } from "@/data/contacts"

async function checkAuth() {
  const c = await cookies()
  const token = c.get(ADMIN_COOKIE)?.value
  return token ? verifyToken(token) : false
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const contacts = await readStore("contacts", CONTACTS)
  return NextResponse.json(contacts)
}

export async function PUT(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await req.json()
  await writeStore("contacts", data)
  return NextResponse.json({ ok: true })
}
