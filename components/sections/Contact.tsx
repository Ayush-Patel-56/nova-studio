'use client'
import { Box, Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactInput } from '@/lib/validations'
import { useState } from 'react'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: '#2a2a2a' },
    '&:hover fieldset': { borderColor: '#444' },
    '&.Mui-focused fieldset': { borderColor: '#2563EB' },
  },
  '& .MuiInputLabel-root': { color: '#6B7280' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#2563EB' },
  '& .MuiFormHelperText-root': { color: '#f87171' },
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactInput>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Box id="contact" sx={{ bgcolor: '#0F0F0F', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="sm">
        <Typography variant="overline" sx={{ color: '#6B7280', letterSpacing: 3 }}>
          Get in touch
        </Typography>
        <Typography
          variant="h2"
          sx={{ color: '#fff', mt: 1, mb: 6, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
        >
          Start a Project
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register('name')}
            label="Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 3, ...inputSx }}
          />
          <TextField
            {...register('email')}
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 3, ...inputSx }}
          />
          <TextField
            {...register('message')}
            label="Message"
            multiline
            rows={5}
            fullWidth
            error={!!errors.message}
            helperText={errors.message?.message}
            sx={{ mb: 4, ...inputSx }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{ py: 1.5, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1d4ed8' } }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </Container>

      <Snackbar open={status !== 'idle'} autoHideDuration={4000} onClose={() => setStatus('idle')}>
        <Alert severity={status === 'success' ? 'success' : 'error'} onClose={() => setStatus('idle')}>
          {status === 'success'
            ? "Message sent. We'll be in touch."
            : 'Something went wrong. Try again.'}
        </Alert>
      </Snackbar>
    </Box>
  )
}
