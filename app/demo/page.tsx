import Landing, { SiteDoc } from '@/components/landing/Landing'

const demoSite: SiteDoc = {
  _id: 'demo',
  userId: 'demo',
  slug: 'demo',
  title: 'Sitio de Demostración',
  structure: { template: 'blog', color: 'indigo', font: 'sans' },
}

export default function DemoPage() {
  return <Landing site={demoSite} />
}
