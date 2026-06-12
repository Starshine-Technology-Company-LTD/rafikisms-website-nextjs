"use client"

import { useEffect, useCallback } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export function Dialog({ open, onClose, title, icon, children }: DialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 shadow-2xl p-6 max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              {icon && <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center shrink-0">{icon}</div>}
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
