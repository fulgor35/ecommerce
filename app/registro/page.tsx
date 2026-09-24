import { registrarUsuario } from '../actions/auth'

export default function RegistroPage() {
    return (
        <main className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Crear cuenta</h1>
            <form action={registrarUsuario} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    required
                    className="border rounded-md p-2"
                />
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
                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
                >
                    Registrarme
                </button>
            </form>
        </main>
    )
}
