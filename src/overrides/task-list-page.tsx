import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import { normalizeCategory } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'
import { PressReleaseDirectory, type PressReleaseCard } from '@/components/press/press-release-directory'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function toCard(post: SitePost): PressReleaseCard {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const catRaw = content.category
  const category = typeof catRaw === 'string' && catRaw.trim() ? catRaw.trim() : 'Release media'
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const images = Array.isArray(content.images) ? content.images.filter((u): u is string => typeof u === 'string') : []
  const logo = typeof content.logo === 'string' ? content.logo : null
  const image =
    (typeof mediaUrl === 'string' && mediaUrl) ||
    (images[0] && images[0]) ||
    (logo && logo) ||
    '/placeholder.svg?height=600&width=960'

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    publishedAt: post.publishedAt || null,
    authorName: post.authorName || null,
    category,
    image,
  }
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts(task, 48, { fresh: true })
  const taskConfig = getTaskConfig(task)
  const routePrefix = taskConfig?.route || '/updates'
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const cards: PressReleaseCard[] = posts.map(toCard)

  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#290001]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <header className="relative overflow-hidden rounded-[2rem] border border-[#e8d8ca] bg-[#fffdfa] px-6 py-10 shadow-[0_20px_60px_rgba(41,0,1,0.06)] sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#c87941]/12 blur-2xl" />
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#87431d]">{taskConfig?.label || 'Press'}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-[#290001] sm:text-5xl">
            Release media archive
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#5c4a42]">
            {taskConfig?.description ||
              'Filter by topic and date, or search across headlines. Each card opens the full wire-formatted release.'}
          </p>
        </header>

        <div className="mt-12">
          <PressReleaseDirectory items={cards} routePrefix={routePrefix} initialCategory={normalizedCategory} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
