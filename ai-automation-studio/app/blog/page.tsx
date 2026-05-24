import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "Блог об AI-автоматизации",
  description: "Статьи о WhatsApp AI, n8n, CRM-автоматизации, AI-ресепшн и бизнес-системах.",
}

export default function BlogPage() {
  const published = blogPosts.filter((p) => p.published_at).sort(
    (a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime()
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Блог</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Статьи об AI-автоматизации
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Разбираем кейсы, сравниваем инструменты, делимся опытом
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {published.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block glass-panel hover-glow overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-br from-accent/10 to-accent-end/5 flex items-center justify-center">
              <span className="text-accent/30 text-5xl font-bold">{post.category.slice(0, 2)}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent border-0">
                  {post.category}
                </Badge>
                <span className="text-text-muted text-[10px]">
                  {new Date(post.published_at!).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <h2 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-text-muted text-sm line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
