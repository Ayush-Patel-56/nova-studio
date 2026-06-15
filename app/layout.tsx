import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import ThemeRegistry from './ThemeRegistry'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nova Studio — Digital Agency',
  description: 'Web design, front-end development, and branding for modern businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
