import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ItemCarrito = {
    id: string
    nombre: string
    precio: number
    imagenUrl: string
    cantidad: number
}

type CarritoState = {
    items: ItemCarrito[]
    agregarItem: (item: Omit<ItemCarrito, 'cantidad'>) => void
    quitarItem: (id: string) => void
    cambiarCantidad: (id: string, cantidad: number) => void
    vaciarCarrito: () => void
}

export const useCarritoStore = create<CarritoState>()(
    persist(
        (set) => ({
            items: [],

            agregarItem: (item) =>
                set((state) => {
                    const existente = state.items.find((i) => i.id === item.id)

                    if (existente) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, cantidad: i.cantidad + 1 }
                                    : i,
                            ),
                        }
                    }

                    return { items: [...state.items, { ...item, cantidad: 1 }] }
                }),

            quitarItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            cambiarCantidad: (id, cantidad) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, cantidad } : i,
                    ),
                })),

            vaciarCarrito: () => set({ items: [] }),
        }),
        {
            name: 'carrito-storage',
        },
    ),
)
