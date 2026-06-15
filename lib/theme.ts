import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: { main: '#2563EB' },
    background: { default: '#F8F8F8', paper: '#FFFFFF' },
    text: { primary: '#111111', secondary: '#6B7280' },
  },
  typography: {
    fontFamily: 'var(--font-dm-sans), sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    button: { textTransform: 'none' as const },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: { body: { margin: 0 } },
    },
  },
})
