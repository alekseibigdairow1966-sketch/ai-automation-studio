import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyPassword, createToken, verifyToken, ADMIN_COOKIE } from "@/lib/admin-auth"

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD не настроен в .env.local" },
      { status: 500 },
    )
  }

  const { password } = await req.json()
  if (!verifyPassword(password)) {
    return NextResponse.json({ ok: false, error: "Неверный пароль" }, { status: 401 })
  }

  const token = createToken()
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 86400,
    path: "/",
  })

  return NextResponse.json({ ok: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  const authenticated = token ? verifyToken(token) : false
  return NextResponse.json({ authenticated })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  return NextResponse.json({ ok: true })
}
