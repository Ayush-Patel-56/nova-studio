import { Box, Container, Typography, Stack, Button } from '@mui/material'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#0F0F0F', py: 6, borderTop: '1px solid #1a1a1a' }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{ justifyContent: 'space-between', alignItems: { md: 'center' } }}
        >
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
            Nova Studio
          </Typography>

          <Stack direction="row" spacing={1}>
            {links.map((l) => (
              <Button
                key={l.label}
                href={l.href}
                sx={{ color: '#6B7280', '&:hover': { color: '#fff', bgcolor: 'transparent' } }}
              >
                {l.label}
              </Button>
            ))}
          </Stack>

          <Typography variant="body2" sx={{ color: '#6B7280' }}>
            © {new Date().getFullYear()} Nova Studio
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
