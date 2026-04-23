export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'b63xmyawgw',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'socialMedixy',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press distribution & media visibility',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Distribute announcements through a professional press wire experience — readable archives, strong typography, and distribution tiers built for modern media teams.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'socialmedixy.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://socialmedixy.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
