import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press distribution desk',
  },
  footer: {
    tagline: 'Media wire & announcement publishing',
  },
  hero: {
    badge: 'Press wire',
    title: ['Distribute announcements with a credible, editorial feel.'],
    description:
      'socialMedixy.com presents releases in a wire-style archive — strong typography, imagery, and discovery tools without generic SaaS chrome.',
    primaryCta: {
      label: 'Open press room',
      href: '/updates',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'Desk note',
    featureCardTitle: 'Built for scanning headlines fast.',
    featureCardDescription:
      'Lead stories, ticker rhythm, and archive grids mirror established press distribution patterns.',
  },
  home: {
    metadata: {
      title: 'Release media & media distribution',
      description:
        'Browse release media, distribution plans, and announcement archives on socialMedixy.com — built for media teams and public communications.',
      openGraphTitle: 'socialMedixy.com — press distribution',
      openGraphDescription:
        'Wire-style release media, archive filters, and readable article pages for modern media distribution.',
      keywords: ['release media', 'media distribution', 'PR wire', 'announcements', 'socialMedixy'],
    },
    introBadge: 'Desk',
    introTitle: 'A press-forward experience, not a repurposed blog template.',
    introParagraphs: [
      'The homepage foregrounds your lead story, recent wire items, and clear paths to pricing and contact — tuned for communications teams.',
      'Archives support category and date-style filtering on the client while preserving the same underlying post model.',
      'Detail pages emphasize imagery, bylines, and share surfaces appropriate for outbound announcements.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Hero + ticker + grid tuned for press scanning.',
      'Archive filters for category, date window, and text match.',
      'Article pages with featured imagery and related releases.',
      'Pricing story with comparison, add-ons, and FAQ.',
    ],
    primaryLink: {
      label: 'Press room',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Contact',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Talk to the desk',
    title: 'Ready to ship your next announcement with more reach?',
    description:
      'Compare distribution tiers, add-ons, and syndication options — then reach out for a tailored bundle.',
    primaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Pricing',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Latest releases',
  taskSectionDescriptionSuffix: 'Newest wire items from the press room.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press room',
    description: 'Search and filter release media by topic, date window, and keyword.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press room',
    paragraphs: [
      'Use filters to narrow releases by category and recency, or search headlines and summaries in-page.',
      'Each card opens a full wire-formatted story with imagery, byline, and related items.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
}
