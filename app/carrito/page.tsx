'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCarritoStore } from '../../lib/carritoStore'
import { crearSesionCheckout } from '../actions/checkout'

export default function CarritoPage() {
    const items = useCarritoStore((state) => state.items)
    const quitarItem = useCarritoStore((state) => state.quitarItem)
    const cambiarCantidad = useCarritoStore((state) => state.cambiarCantidad)
    const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)

    const total = items.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0,
    )

    if (items.length === 0) {
        return (
            <main className="p-8 max-w-2xl mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Tu carrito está vacío
                </h1>
                <Link href="/productos" className="text-blue-600 underline">
                    Ver productos
                </Link>
            </main>
        )
    }

    return (
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
            <div className="flex flex-col gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 border rounded-lg p-4"
                    >
                        <Image
                            src={item.imagenUrl}
                            alt={item.nombre}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            style={{ width: '80px', height: '80px' }}
                        />
                        <div className="flex-1">
                            <h2 className="font-semibold">{item.nombre}</h2>
                            <p className="text-gray-600">
                                ${item.precio.toLocaleString('es-AR')}
                            </p>
                        </div>
                        <input
                            type="number"
                            min={1}
                            value={item.cantidad}
                            onChange={(e) =>
                                cambiarCantidad(item.id, Number(e.target.value))
                            }
                            className="w-16 border rounded-md p-1 text-center"
                        />
                        <button
                            onClick={() => quitarItem(item.id)}
                            className="text-red-600 hover:underline"
                        >
                            Quitar
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
                <p className="text-xl font-bold">
                    Total: ${total.toLocaleString('es-AR')}
                </p>
                <button
                    onClick={async () => {
                        await crearSesionCheckout(items)
                        vaciarCarrito()
                    }}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                >
                    Ir a pagar
                </button>
            </div>
        </main>
    )
}
