'use client'
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: '#0F0F0F', borderBottom: '1px solid #1a1a1a' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
          Nova Studio
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
          {links.map((link) => (
            <Button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              sx={{ color: '#6B7280', '&:hover': { color: '#fff', bgcolor: 'transparent' } }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <IconButton
          sx={{ display: { md: 'none' }, color: '#fff' }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { bgcolor: '#0F0F0F', width: 220 } } }}
      >
        <List sx={{ pt: 8 }}>
          {links.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton onClick={() => scrollTo(link.href)} sx={{ color: '#fff' }}>
                {link.label}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  )
}
