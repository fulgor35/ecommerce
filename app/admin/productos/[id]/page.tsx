import { prisma } from '../../../../lib/prisma'
import { actualizarProducto } from '../../../actions/productos'
import { notFound } from 'next/navigation'

export default async function EditarProductoPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const producto = await prisma.producto.findUnique({ where: { id } })

    if (!producto) notFound()

    const actualizarConId = actualizarProducto.bind(null, id)

    return (
        <div className="max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Editar producto</h1>
            <form action={actualizarConId} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="nombre"
                    defaultValue={producto.nombre}
                    required
                    className="border rounded-md p-2"
                />
                <textarea
                    name="descripcion"
                    defaultValue={producto.descripcion}
                    required
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    step="0.01"
                    name="precio"
                    defaultValue={producto.precio}
                    required
                    className="border rounded-md p-2"
                />
                <input
                    type="text"
                    name="imagenUrl"
                    defaultValue={producto.imagenUrl}
                    required
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    name="stock"
                    defaultValue={producto.stock}
                    required
                    className="border rounded-md p-2"
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    )
}
