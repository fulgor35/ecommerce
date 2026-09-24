import Image from 'next/image'
import { prisma } from '../../../lib/prisma'
import { notFound } from 'next/navigation'
import BotonAgregarCarrito from './BotonAgregarCarrito'

export default async function ProductoDetallePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const producto = await prisma.producto.findUnique({
        where: { id },
    })

    if (!producto) {
        notFound()
    }

    return (
        <main className="p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Image
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    width={500}
                    height={400}
                    className="w-full h-auto rounded-lg"
                />
                <div>
                    <h1 className="text-3xl font-bold mb-4">
                        {producto.nombre}
                    </h1>
                    <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                    <p className="text-2xl font-bold mb-4">
                        ${producto.precio.toLocaleString('es-AR')}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Stock disponible: {producto.stock}
                    </p>
                    <BotonAgregarCarrito
                        producto={{
                            id: producto.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            imagenUrl: producto.imagenUrl,
                        }}
                    />
                </div>
            </div>
        </main>
    )
}
