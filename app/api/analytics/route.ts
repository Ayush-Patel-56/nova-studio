import { NextRequest, NextResponse } from 'next/server'
import { connectMongoDB, AnalyticsEvent } from '@/lib/mongodb'
import { analyticsSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const parsed = analyticsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  await connectMongoDB()
  await AnalyticsEvent.create({
    event_type: parsed.data.event_type,
    metadata: parsed.data.metadata ?? {},
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
