'use client'
import { Box, Typography } from '@mui/material'
import { Stat } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useCountUp } from '@/hooks/useCountUp'

function parseValue(raw: string): { num: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/)
  return match ? { num: parseInt(match[1]), suffix: match[2] } : { num: 0, suffix: raw }
}

export default function StatCounter({ stat }: { stat: Stat }) {
  const { ref, isVisible } = useIntersectionObserver()
  const { num, suffix } = parseValue(stat.value)
  const count = useCountUp(num, 1500, isVisible)

  return (
    <Box ref={ref} sx={{ textAlign: 'center', py: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: 600, fontSize: { xs: '2.75rem', md: '3.5rem' }, color: '#111' }}
      >
        {count}{suffix}
      </Typography>
      <Typography variant="body1" sx={{ color: '#6B7280', mt: 1 }}>
        {stat.label}
      </Typography>
    </Box>
  )
}
