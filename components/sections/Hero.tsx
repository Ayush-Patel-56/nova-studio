'use client'
import { Box, Container, Typography, Button } from '@mui/material'

export default function Hero() {
  const handleCTA = async () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type: 'cta_click', metadata: { button: 'start_a_project' } }),
    }).catch(() => null)
  }

  return (
    <Box
      sx={{
        bgcolor: '#0F0F0F',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        animation: 'fadeSlideUp 0.6s ease both',
        '@keyframes fadeSlideUp': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{ color: '#6B7280', letterSpacing: 3, display: 'block', mb: 2 }}
        >
          Nova Studio
        </Typography>

        <Typography
          variant="h1"
          sx={{
            color: '#FFFFFF',
            fontSize: { xs: '2.25rem', sm: '3rem', md: '4.5rem' },
            lineHeight: 1.1,
            mb: 3,
            maxWidth: 680,
          }}
        >
          We build digital products that work.
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: '#6B7280', fontSize: '1.125rem', mb: 5, maxWidth: 480 }}
        >
          Design, development, and branding for businesses that need results, not just deliverables.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleCTA}
          sx={{
            bgcolor: '#2563EB',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': { bgcolor: '#1d4ed8' },
          }}
        >
          Start a Project
        </Button>
      </Container>
    </Box>
  )
}
