'use client'
import { Box, TextField, Button, Typography, Alert, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Project } from '@/types'

const CATEGORIES = ['Web Design', 'Front-End Development', 'Branding', 'UI/UX', 'Mobile']

export default function AddProjectForm({ onAdd }: { onAdd: (p: Project) => void }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) { setError('Please select an image.'); return }

    setLoading(true)
    setError('')

    const form = new FormData()
    form.append('title', title)
    form.append('category', category)
    form.append('image', file)

    const res = await fetch('/api/projects', { method: 'POST', body: form })

    if (res.ok) {
      const project: Project = await res.json()
      onAdd(project)
      setTitle('')
      setCategory('')
      setFile(null)
    } else {
      const data = await res.json()
      setError(typeof data.error === 'string' ? data.error : 'Failed to add project.')
    }
    setLoading(false)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2, bgcolor: '#fff' }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Add New Project
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      >
        {CATEGORIES.map((c) => (
          <MenuItem key={c} value={c}>{c}</MenuItem>
        ))}
      </TextField>

      <Button variant="outlined" component="label" sx={{ mb: 1, display: 'block' }}>
        {file ? file.name : 'Select Image'}
        <input
          type="file"
          hidden
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </Button>

      <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
        {loading ? 'Uploading...' : 'Add Project'}
      </Button>
    </Box>
  )
}
