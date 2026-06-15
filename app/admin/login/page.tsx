'use client'
import { Box, Container, Typography, TextField, Button, Alert } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      username: form.get('username') as string,
      password: form.get('password') as string,
      redirect: false,
    })

    if (result?.ok) {
      router.push('/admin')
    } else {
      setError('Invalid username or password.')
    }
    setLoading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#F8F8F8' }}>
      <Container maxWidth="xs">
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Admin Login
        </Typography>
        <Typography variant="body2" sx={{ color: '#6B7280', mb: 4 }}>
          Nova Studio
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField name="username" label="Username" fullWidth required sx={{ mb: 2 }} />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
