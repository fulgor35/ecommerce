'use client'

import { useCarritoStore } from '../../../lib/carritoStore'

type Props = {
    producto: {
        id: string
        nombre: string
        precio: number
        imagenUrl: string
    }
}

export default function BotonAgregarCarrito({ producto }: Props) {
    const agregarItem = useCarritoStore((state) => state.agregarItem)

    return (
        <button
            onClick={() => agregarItem(producto)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
            Agregar al carrito
        </button>
    )
}
