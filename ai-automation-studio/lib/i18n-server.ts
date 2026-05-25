import { cookies } from "next/headers"
import { translations, type Locale, type TranslationKeys } from "./translations"

// Helper for server components — reads cookie directly
export async function getServerLocale(): Promise<Locale> {
  const c = await cookies()
  const val = c.get("locale")?.value
  return val === "kk" ? "kk" : "ru"
}

// Get translations for a given locale (works in any context)
export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale]
}
