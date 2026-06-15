import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getSupabaseAdmin } from '@/lib/supabase'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const [contactsRes, projectsRes] = await Promise.all([
    getSupabaseAdmin().from('contacts').select('*').order('created_at', { ascending: false }),
    getSupabaseAdmin().from('projects').select('*').order('created_at', { ascending: false }),
  ])

  return (
    <AdminDashboard
      contacts={contactsRes.data ?? []}
      initialProjects={projectsRes.data ?? []}
    />
  )
}
