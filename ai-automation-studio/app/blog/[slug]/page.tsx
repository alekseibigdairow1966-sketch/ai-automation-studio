import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/blog-posts"
import { BlogPostContent } from "./blog-post-content"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.filter((p) => p.published_at).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug && p.published_at)
  if (!post) notFound()

  const related = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category && p.published_at)
    .slice(0, 2)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8">
        <ArrowLeft size={14} /> Все статьи
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-0">
              {post.category}
            </Badge>
            <span className="text-text-muted text-xs">
              {new Date(post.published_at!).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">{post.title}</h1>
        </div>

        <BlogPostContent content={post.content} />
      </article>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-white/[0.06]">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Похожие статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="glass-panel hover-glow p-5">
                <Badge variant="secondary" className="mb-2 text-[10px] bg-accent/10 text-accent border-0">
                  {r.category}
                </Badge>
                <h3 className="text-text-primary text-sm font-medium hover:text-accent transition-colors">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
