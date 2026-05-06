import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Linkedin, Facebook, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { CopyLinkButton } from '@/components/press/copy-link-button'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getContent(post: SitePost) {
  return post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getHeroImage(post: SitePost) {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const images = Array.isArray(content.images) ? content.images.filter((u): u is string => typeof u === 'string') : []
  const logo = typeof content.logo === 'string' ? content.logo : null
  return (
    (typeof mediaUrl === 'string' && mediaUrl) ||
    images[0] ||
    logo ||
    '/placeholder.svg?height=900&width=1600'
  )
}

function subtitleFrom(post: SitePost) {
  const content = getContent(post)
  const ex = typeof content.excerpt === 'string' ? content.excerpt : ''
  if (ex.trim()) return ex.trim()
  const s = (post.summary || '').trim()
  if (!s) return ''
  return s.length > 220 ? s.slice(0, 217).trimEnd() + '…' : s
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()

  const taskConfig = getTaskConfig(task)
  const base = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const route = taskConfig?.route || '/updates'
  const canonicalUrl = `${base}${route}/${slug}`

  const content = getContent(post)
  const html = formatRichHtml(
    (typeof content.body === 'string' && content.body) || post.summary || '',
    'Full release text will appear here once published.',
  )

  const related = (await fetchTaskPosts(task, 10, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 4)

  const encodedUrl = encodeURIComponent(canonicalUrl)
  const encodedTitle = encodeURIComponent(post.title)
  const share = {
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    in: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    fb: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  }

  const hero = getHeroImage(post)
  const sub = subtitleFrom(post)
  const category =
    typeof content.category === 'string' && content.category.trim()
      ? content.category.trim()
      : 'Release media'

  const absoluteImage =
    hero.startsWith('http://') || hero.startsWith('https://')
      ? hero
      : `${base}${hero.startsWith('/') ? hero : `/${hero}`}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.summary || sub,
    image: [absoluteImage],
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: post.authorName || 'Editorial desk',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#290001]">
      <NavbarShell />
      <SchemaJsonLd data={articleSchema} />

      <article>
        <header className="border-b border-[#e8d8ca] bg-[#fffdfa]">
          <div className="relative mx-auto max-w-4xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pb-14 sm:pt-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#87431d]">{category}</p>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-[#290001] sm:text-4xl lg:text-[2.65rem]">
              {post.title}
            </h1>
            {sub ? (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#5c4a42] sm:text-xl">{sub}</p>
            ) : null}
            <nav className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#87431d]">
              <Link href="/" className="hover:text-[#290001]">
                Home
              </Link>
              <span aria-hidden className="text-[#dbcbbd]">
                /
              </span>
              <Link href={route} className="hover:text-[#290001]">
                {taskConfig?.label || 'Archive'}
              </Link>
              <span aria-hidden className="text-[#dbcbbd]">
                /
              </span>
              <span className="max-w-[min(100%,320px)] truncate text-[#5c4a42]">{post.title}</span>
            </nav>
          </div>

          <div className="relative mx-auto max-w-5xl px-4 pb-10 sm:px-6">
            <div className="relative aspect-[21/9] overflow-hidden rounded-[1.75rem] border border-[#e8d8ca] bg-[#f0e6dc] shadow-[0_24px_70px_rgba(41,0,1,0.08)] sm:aspect-[2.4/1]">
              <ContentImage src={hero} alt="" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 1024px" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#290001]/25 to-transparent" />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 lg:py-16">
          <div className="min-w-0">
            <div className="article-content prose prose-lg max-w-none rounded-[1.5rem] border border-[#e8d8ca] bg-[#fffdfa] px-5 py-8 text-[#2a1810] shadow-sm sm:px-10 sm:py-11 prose-headings:font-display prose-a:text-[#87431d]">
              <RichContent html={html} />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#e8d8ca] pt-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#87431d]">Share</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={share.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8d8ca] bg-white px-4 py-2 text-sm font-semibold text-[#290001] transition hover:border-[#c87941]"
                >
                  <Twitter className="h-4 w-4" />
                  Post
                </a>
                <a
                  href={share.in}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8d8ca] bg-white px-4 py-2 text-sm font-semibold text-[#290001] transition hover:border-[#c87941]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={share.fb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8d8ca] bg-white px-4 py-2 text-sm font-semibold text-[#290001] transition hover:border-[#c87941]"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
                <CopyLinkButton url={canonicalUrl} />
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:pt-2">
            <form action="/search" method="get" className="rounded-2xl border border-[#e8d8ca] bg-[#fffdfa] p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#87431d]">Search wire</p>
              <div className="mt-3 flex gap-2">
                <input type="hidden" name="task" value={task} />
                <input
                  name="q"
                  placeholder="Search…"
                  className="h-11 flex-1 rounded-xl border border-[#dbcbbd] bg-white px-3 text-sm text-[#290001] outline-none ring-[#c87941]/30 focus:ring-2"
                />
                <button type="submit" className="h-11 rounded-xl bg-[#87431d] px-4 text-sm font-semibold text-[#dbcbbd]">
                  Go
                </button>
              </div>
            </form>

            {related.length ? (
              <div className="rounded-2xl border border-[#e8d8ca] bg-[#fffdfa] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#87431d]">Related releases</p>
                <ul className="mt-4 space-y-4">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link href={`${route}/${item.slug}`} className="group flex gap-3">
                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f0e6dc]">
                          <ContentImage
                            src={getHeroImage(item)}
                            alt=""
                            fill
                            className="object-cover transition group-hover:scale-105"
                            sizes="96px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm font-semibold leading-snug text-[#290001] group-hover:text-[#87431d]">
                            {item.title}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  )
}
