'use server'

import { stripe } from '../../lib/stripe'
import { redirect } from 'next/navigation'

type ItemCheckout = {
    id: string
    nombre: string
    precio: number
    cantidad: number
    imagenUrl: string
}

export async function crearSesionCheckout(items: ItemCheckout[]) {
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.nombre,
                    images: [item.imagenUrl],
                },
                unit_amount: Math.round(item.precio * 100),
            },
            quantity: item.cantidad,
        })),
        success_url: `http://localhost:3000/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/carrito`,
    })

    if (session.url) {
        redirect(session.url)
    }
}
