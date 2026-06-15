import { supabase } from '@/lib/supabase'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Stats from '@/components/sections/Stats'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

async function getData() {
  const [servicesRes, projectsRes, statsRes] = await Promise.all([
    supabase.from('services').select('*'),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('stats').select('*'),
  ])
  return {
    services: servicesRes.data ?? [],
    projects: projectsRes.data ?? [],
    stats:    statsRes.data ?? [],
  }
}

export default async function HomePage() {
  const { services, projects, stats } = await getData()

  return (
    <>
      <Hero />
      <Services services={services} />
      <Portfolio projects={projects} />
      <Stats stats={stats} />
      <Contact />
      <Footer />
    </>
  )
}
