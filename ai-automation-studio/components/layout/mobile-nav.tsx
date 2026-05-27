"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: { href: string; label: string }[]
  discussLabel?: string
}

export function MobileNav({ open, onClose, links, discussLabel = "Обсудить проект" }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-surface border-b border-white/10 shadow-xl"
        >
          <div className="px-4 py-6 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/contact" onClick={onClose}>
                <Button className="w-full accent-gradient text-white text-sm font-medium">
                  {discussLabel}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
