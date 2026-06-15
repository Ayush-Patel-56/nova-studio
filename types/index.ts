export interface Project {
  id: string
  title: string
  category: string
  image_url: string
  created_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface Stat {
  id: string
  label: string
  value: string
}

export interface Service {
  id: string
  title: string
  description: string
}
