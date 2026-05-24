import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ConsultantWidget } from "@/components/ai-consultant/consultant-widget"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "AIAutomation Studio — AI-инфраструктура для бизнеса",
    template: "%s | AIAutomation Studio",
  },
  description: "Строим AI-автоматизацию для сервисного бизнеса. WhatsApp AI, CRM-автоматизация, AI-ресепшн, n8n workflows. 30+ проектов, 50+ интеграций.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiautomation.studio"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className={inter.className}>
        <Header />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
        <ConsultantWidget />
      </body>
    </html>
  )
}
