import crypto from "crypto"

const TOKEN_MAX_AGE = 24 * 60 * 60 * 1000 // 24h

export const ADMIN_COOKIE = "admin_session"

export function verifyPassword(input: string): boolean {
  const pass = process.env.ADMIN_PASSWORD
  if (!pass) return false
  return input === pass
}

export function createToken(): string {
  const secret = process.env.ADMIN_PASSWORD || "fallback"
  const ts = Date.now().toString()
  const hmac = crypto.createHmac("sha256", secret).update(ts).digest("hex")
  return `${ts}.${hmac}`
}

export function verifyToken(token: string): boolean {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret || !token) return false
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [ts, hmac] = parts
  const age = Date.now() - parseInt(ts)
  if (isNaN(age) || age > TOKEN_MAX_AGE || age < 0) return false
  const expected = crypto.createHmac("sha256", secret).update(ts).digest("hex")
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(expected, "hex"))
  } catch {
    return false
  }
}
