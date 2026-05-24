"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

export function BlogPostContent({ content }: { content: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 h-0.5 bg-transparent z-40">
        <div className="h-full accent-gradient transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-zinc max-w-none
        prose-headings:text-text-primary prose-headings:font-semibold
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-text-secondary prose-p:leading-relaxed prose-p:text-sm
        prose-li:text-text-secondary prose-li:text-sm
        prose-strong:text-text-primary
        prose-ul:space-y-1
      ">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  )
}
