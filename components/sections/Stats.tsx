import { Box, Container, Grid } from '@mui/material'
import StatCounter from '@/components/ui/StatCounter'
import { Stat } from '@/types'

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <Box sx={{ bgcolor: '#F8F8F8', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat) => (
            <Grid size={{ xs: 12, md: 4 }} key={stat.id}>
              <StatCounter stat={stat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
