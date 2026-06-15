'use client'
import { Box, Container, Typography, Grid, Button, Stack } from '@mui/material'
import PortfolioCard from '@/components/ui/PortfolioCard'
import { Project } from '@/types'
import { useState } from 'react'

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <Box id="portfolio" sx={{ bgcolor: '#0F0F0F', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: '#6B7280', letterSpacing: 3 }}>
          Our work
        </Typography>
        <Typography
          variant="h2"
          sx={{ mt: 1, mb: 4, color: '#FFFFFF', fontSize: { xs: '1.75rem', md: '2.5rem' } }}
        >
          Portfolio
        </Typography>

        <Stack direction="row" sx={{ mb: 6, flexWrap: 'wrap', gap: 1 }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={active === cat ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setActive(cat)}
              sx={{
                color: active === cat ? '#fff' : '#6B7280',
                borderColor: '#333',
                '&:hover': { borderColor: '#2563EB', bgcolor: 'transparent', color: '#fff' },
                ...(active === cat && { bgcolor: '#2563EB', borderColor: '#2563EB' }),
              }}
            >
              {cat}
            </Button>
          ))}
        </Stack>

        {visible.length === 0 ? (
          <Typography sx={{ color: '#6B7280' }}>No projects in this category yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {visible.map((project, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <PortfolioCard project={project} index={i} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
