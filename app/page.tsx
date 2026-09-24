import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '../lib/prisma'

export default async function HomePage() {
    const productosDestacados = await prisma.producto.findMany({
        take: 3,
        orderBy: { creadoEn: 'desc' },
    })

    return (
        <main>
            {/* Banner principal */}
            <section className="bg-black text-white py-20 px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Bienvenido a tu tienda online
                </h1>
                <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                    Encontrá los mejores productos, con envíos rápidos y pagos
                    seguros.
                </p>
                <Link
                    href="/productos"
                    className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block"
                >
                    Ver productos
                </Link>
            </section>

            {/* Productos destacados */}
            {productosDestacados.length > 0 && (
                <section className="max-w-6xl mx-auto py-16 px-8">
                    <h2 className="text-2xl font-bold mb-8 text-center">
                        Productos destacados
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {productosDestacados.map((producto) => (
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
                                <h3 className="text-lg font-semibold">
                                    {producto.nombre}
                                </h3>
                                <p className="text-lg font-bold mt-1">
                                    ${producto.precio.toLocaleString('es-AR')}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href="/productos"
                            className="text-black underline font-semibold"
                        >
                            Ver todo el catálogo →
                        </Link>
                    </div>
                </section>
            )}

            {/* Beneficios */}
            <section className="bg-gray-50 py-16 px-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">
                            Envío rápido
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Recibí tu pedido en pocos días hábiles.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">
                            Pagos seguros
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Procesamos tus pagos con Stripe, de forma segura.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Soporte</h3>
                        <p className="text-gray-600 text-sm">
                            Escribinos ante cualquier duda sobre tu compra.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
