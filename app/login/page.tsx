'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const resultado = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if (resultado?.error) {
            setError('Email o contraseña incorrectos')
        } else {
            router.push('/productos')
        }
    }

    return (
        <main className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="border rounded-md p-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    required
                    className="border rounded-md p-2"
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
                >
                    Ingresar
                </button>
            </form>
        </main>
    )
}
