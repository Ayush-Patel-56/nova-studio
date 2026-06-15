import mongoose from 'mongoose'

let isConnected = false

export async function connectMongoDB() {
  if (isConnected) return
  const conn = await mongoose.connect(process.env.MONGODB_URI!)
  isConnected = conn.connections[0].readyState === 1
}

const analyticsSchema = new mongoose.Schema({
  event_type: { type: String, required: true },
  metadata:   { type: mongoose.Schema.Types.Mixed, default: {} },
  timestamp:  { type: Date, default: Date.now },
})

export const AnalyticsEvent =
  mongoose.models.AnalyticsEvent ||
  mongoose.model('AnalyticsEvent', analyticsSchema)
