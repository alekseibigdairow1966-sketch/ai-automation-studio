"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { Menu } from "lucide-react"

interface AdminCtx {
  authenticated: boolean
  logout: () => Promise<void>
}

const Ctx = createContext<AdminCtx>({
  authenticated: false,
  logout: async () => {},
})

export const useAdmin = () => useContext(Ctx)

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuth(d.authenticated))
      .catch(() => setAuth(false))
  }, [pathname])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const logout = useCallback(async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    setAuth(false)
    router.push("/admin")
  }, [router])

  /* ---- Loading ---- */
  if (auth === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  /* ---- Not authenticated ---- */
  if (!auth) {
    if (pathname !== "/admin") {
      router.replace("/admin")
      return null
    }
    return (
      <Ctx.Provider value={{ authenticated: false, logout }}>
        <div className="min-h-screen bg-background">{children}</div>
      </Ctx.Provider>
    )
  }

  /* ---- Authenticated — sidebar layout ---- */
  return (
    <Ctx.Provider value={{ authenticated: true, logout }}>
      <div className="min-h-screen bg-background flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-surface border-b border-white/10 flex items-center px-4 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <Menu size={22} />
          </button>
          <span className="ml-3 text-text-primary text-sm font-semibold">
            Админ-панель
          </span>
        </div>

        <main className="flex-1 md:ml-64 pt-14 md:pt-0 p-5 md:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </Ctx.Provider>
  )
}
