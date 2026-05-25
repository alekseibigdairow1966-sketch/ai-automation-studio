import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { blogPosts as defaultBlog } from "@/data/blog-posts"
import { readStore } from "@/lib/content-store"
import { BlogPostContent } from "./blog-post-content"
import { getServerLocale, getTranslations } from "@/lib/i18n-server"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogPosts = await readStore("blog", defaultBlog)
  return blogPosts.filter((p: { published_at: string | null }) => p.published_at).map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blogPosts = await readStore("blog", defaultBlog)
  const post = blogPosts.find((p: { slug: string }) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const blogPosts = await readStore("blog", defaultBlog)
  const locale = await getServerLocale()
  const t = getTranslations(locale)
  const post = blogPosts.find((p: { slug: string; published_at: string | null }) => p.slug === slug && p.published_at)
  if (!post) notFound()

  const related = blogPosts
    .filter((p: { id: string; category: string; published_at: string | null }) => p.id !== post.id && p.category === post.category && p.published_at)
    .slice(0, 2)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8">
        <ArrowLeft size={14} /> {t.blogPage.allArticles}
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-0">
              {post.category}
            </Badge>
            <span className="text-text-muted text-xs">
              {new Date(post.published_at!).toLocaleDateString(locale === "kk" ? "kk-KZ" : "ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">{post.title}</h1>
        </div>

        <BlogPostContent content={post.content} />
      </article>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-white/[0.06]">
          <h2 className="text-xl font-semibold text-text-primary mb-6">{t.blogPage.relatedArticles}</h2>
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
