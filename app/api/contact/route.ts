import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { connectMongoDB, AnalyticsEvent } from '@/lib/mongodb'
import { contactSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { name, email, message } = parsed.data

  const { error } = await supabaseAdmin
    .from('contacts')
    .insert({ name, email, message })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await connectMongoDB()
  await AnalyticsEvent.create({
    event_type: 'contact_submission',
    metadata: { email },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
