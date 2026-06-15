import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography,
} from '@mui/material'
import { Contact } from '@/types'

export default function ContactsTable({ contacts }: { contacts: Contact[] }) {
  if (contacts.length === 0) {
    return <Typography sx={{ color: '#6B7280' }}>No submissions yet.</Typography>
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F8F8F8' }}>
            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell sx={{ maxWidth: 320, wordBreak: 'break-word' }}>{c.message}</TableCell>
              <TableCell sx={{ color: '#6B7280', whiteSpace: 'nowrap' }}>
                {new Date(c.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
