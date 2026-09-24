import { prisma } from '../../../lib/prisma'
import Link from 'next/link'
import { eliminarProducto } from '../../actions/productos'

export default async function AdminProductosPage() {
    const productos = await prisma.producto.findMany({
        orderBy: { creadoEn: 'desc' },
    })

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Productos</h1>
                <Link
                    href="/admin/productos/nuevo"
                    className="bg-black text-white px-4 py-2 rounded-lg"
                >
                    + Nuevo producto
                </Link>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-left border-b">
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id} className="border-b">
                            <td className="p-2">{producto.nombre}</td>
                            <td className="p-2">
                                ${producto.precio.toLocaleString('es-AR')}
                            </td>
                            <td className="p-2">{producto.stock}</td>
                            <td className="p-2 flex gap-3">
                                <Link
                                    href={`/admin/productos/${producto.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Editar
                                </Link>
                                <form
                                    action={async () => {
                                        'use server'
                                        await eliminarProducto(producto.id)
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="text-red-600 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
