import { z } from 'zod'

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:   z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const projectSchema = z.object({
  title:    z.string().min(2, 'Title must be at least 2 characters').max(100),
  category: z.string().min(2, 'Category required').max(50),
})

export const analyticsSchema = z.object({
  event_type: z.enum(['cta_click', 'page_visit', 'contact_submission']),
  metadata:   z.record(z.string(), z.unknown()).optional(),
})

export type ContactInput   = z.infer<typeof contactSchema>
export type ProjectInput   = z.infer<typeof projectSchema>
export type AnalyticsInput = z.infer<typeof analyticsSchema>
