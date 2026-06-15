import { Box, Typography } from '@mui/material'
import { Service } from '@/types'

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Box
      sx={{
        p: 4,
        height: '100%',
        border: '1px solid #E5E7EB',
        borderRadius: 2,
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: '#2563EB',
        },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {service.title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.75 }}>
        {service.description}
      </Typography>
    </Box>
  )
}
