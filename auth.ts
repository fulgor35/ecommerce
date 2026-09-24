import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Contraseña', type: 'password' },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string
                const password = credentials.password as string

                if (!email || !password) return null

                const usuario = await prisma.usuario.findUnique({
                    where: { email },
                })

                if (!usuario) return null

                const passwordValida = await bcrypt.compare(
                    password,
                    usuario.password,
                )

                if (!passwordValida) return null

                return {
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email,
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
})
