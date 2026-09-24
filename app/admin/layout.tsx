import { auth } from '../../auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-56 bg-gray-100 p-6 flex flex-col gap-4">
                <h2 className="font-bold text-lg mb-4">Panel Admin</h2>
                <Link href="/admin" className="hover:underline">
                    Inicio
                </Link>
                <Link href="/admin/productos" className="hover:underline">
                    Productos
                </Link>
                <Link href="/admin/ordenes" className="hover:underline">
                    Órdenes
                </Link>
            </aside>
            <div className="flex-1 p-8">{children}</div>
        </div>
    )
}
