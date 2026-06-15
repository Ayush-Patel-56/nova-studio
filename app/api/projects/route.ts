import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { uploadToGCS } from '@/lib/gcs'
import { projectSchema } from '@/lib/validations'

export async function GET() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const title    = formData.get('title') as string
  const category = formData.get('category') as string
  const file     = formData.get('image') as File | null

  const parsed = projectSchema.safeParse({ title, category })
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'Image is required' }, { status: 400 })
  }

  const buffer   = Buffer.from(await file.arrayBuffer())
  const imageUrl = await uploadToGCS(buffer, file.type)

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert({ title, category, image_url: imageUrl })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
