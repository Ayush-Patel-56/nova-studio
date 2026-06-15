'use client'
import { Box, Container, Typography, Tabs, Tab, Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import ContactsTable from './ContactsTable'
import ProjectManager from './ProjectManager'
import { Contact, Project } from '@/types'

interface Props {
  contacts: Contact[]
  initialProjects: Project[]
}

export default function AdminDashboard({ contacts, initialProjects }: Props) {
  const [tab, setTab] = useState(0)
  const [projects, setProjects] = useState(initialProjects)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8F8F8' }}>
      <Box
        sx={{
          bgcolor: '#fff',
          borderBottom: '1px solid #E5E7EB',
          px: 4,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Nova Studio — Admin
        </Typography>
        <Button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          sx={{ color: '#6B7280' }}
        >
          Sign out
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 4 }}>
          <Tab label="Contact Submissions" />
          <Tab label="Portfolio Projects" />
        </Tabs>

        {tab === 0 && <ContactsTable contacts={contacts} />}
        {tab === 1 && <ProjectManager projects={projects} setProjects={setProjects} />}
      </Container>
    </Box>
  )
}
