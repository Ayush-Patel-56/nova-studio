import { Box, Container, Typography, Grid } from '@mui/material'
import ServiceCard from '@/components/ui/ServiceCard'
import { Service } from '@/types'

export default function Services({ services }: { services: Service[] }) {
  return (
    <Box id="services" sx={{ bgcolor: '#F8F8F8', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: '#6B7280', letterSpacing: 3 }}>
          What we do
        </Typography>
        <Typography
          variant="h2"
          sx={{ mt: 1, mb: 8, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((s) => (
            <Grid size={{ xs: 12, md: 4 }} key={s.id}>
              <ServiceCard service={s} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
