export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press room',
    route: '/updates',
    description: 'Browse the latest press releases, filters, and full wire-formatted stories.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
} as const
