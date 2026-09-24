import { prisma } from '../../lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProductosPage() {
    const productos = await prisma.producto.findMany()

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.map((producto) => (
                    <Link
                        key={producto.id}
                        href={`/productos/${producto.id}`}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <Image
                            src={producto.imagenUrl}
                            alt={producto.nombre}
                            width={400}
                            height={300}
                            style={{ width: '100%', height: '12rem' }}
                            className="object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold">
                            {producto.nombre}
                        </h2>
                        <p className="text-gray-600 text-sm mb-2">
                            {producto.descripcion}
                        </p>
                        <p className="text-lg font-bold">
                            ${producto.precio.toLocaleString('es-AR')}
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    )
}
