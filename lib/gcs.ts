import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!)

export async function uploadToGCS(buffer: Buffer, mimetype: string): Promise<string> {
  const ext = mimetype.split('/')[1]
  const filename = `${crypto.randomUUID()}.${ext}`
  const file = bucket.file(filename)

  await file.save(buffer, {
    metadata: { contentType: mimetype },
    public: true,
  })

  return `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${filename}`
}
