'use client'
import { Box, Typography, Chip } from '@mui/material'
import Image from 'next/image'
import { Project } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface PortfolioCardProps {
  project: Project
  index: number
}

export default function PortfolioCard({ project, index }: PortfolioCardProps) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`,
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover .card-image': { transform: 'scale(1.04)' },
        '&:hover .card-overlay': { opacity: 1 },
      }}
    >
      <Box sx={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <Box
          className="card-image"
          sx={{ position: 'relative', height: '100%', transition: 'transform 0.35s ease' }}
        >
          <Image src={project.image_url} alt={project.title} fill style={{ objectFit: 'cover' }} />
        </Box>
        <Box
          className="card-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(37,99,235,0.75)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, px: 2, textAlign: 'center' }}>
            {project.title}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2, bgcolor: '#1a1a1a' }}>
        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, mb: 0.5 }}>
          {project.title}
        </Typography>
        <Chip
          label={project.category}
          size="small"
          sx={{ bgcolor: '#2563EB', color: '#fff', fontSize: '0.7rem', height: 22 }}
        />
      </Box>
    </Box>
  )
}
