'use server'

import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function registrarUsuario(formData: FormData) {
    const nombre = formData.get('nombre') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!nombre || !email || !password) {
        throw new Error('Todos los campos son obligatorios')
    }

    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
    })

    if (usuarioExistente) {
        throw new Error('Ya existe una cuenta con ese email')
    }

    const passwordHasheada = await bcrypt.hash(password, 10)

    await prisma.usuario.create({
        data: {
            nombre,
            email,
            password: passwordHasheada,
        },
    })

    redirect('/login')
}
