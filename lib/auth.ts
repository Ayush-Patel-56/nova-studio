import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        const validUsername = credentials.username === process.env.ADMIN_USERNAME
        const validPassword = await bcrypt.compare(
          credentials.password as string,
          process.env.ADMIN_PASSWORD!
        )

        if (validUsername && validPassword) {
          return { id: 'admin', name: 'Admin', email: 'admin@novastudio.com' }
        }
        return null
      },
    }),
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
})
