'use client'
import { Box, Grid, IconButton, Typography, Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Image from 'next/image'
import { Project } from '@/types'
import AddProjectForm from './AddProjectForm'
import { useState } from 'react'

interface Props {
  projects: Project[]
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}

export default function ProjectManager({ projects, setProjects }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeleting(id)
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id))
    setDeleting(null)
  }

  return (
    <Box>
      <AddProjectForm onAdd={(p) => setProjects((prev) => [p, ...prev])} />

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 6, mb: 3 }}>
        Current Projects ({projects.length})
      </Typography>

      {projects.length === 0 && (
        <Typography sx={{ color: '#6B7280' }}>No projects added yet.</Typography>
      )}

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
            <Box sx={{ border: '1px solid #E5E7EB', borderRadius: 2, overflow: 'hidden', bgcolor: '#fff' }}>
              <Box sx={{ position: 'relative', height: 180 }}>
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {project.title}
                  </Typography>
                  <Chip label={project.category} size="small" sx={{ mt: 0.5 }} />
                </Box>
                <IconButton
                  onClick={() => handleDelete(project.id)}
                  disabled={deleting === project.id}
                  color="error"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
