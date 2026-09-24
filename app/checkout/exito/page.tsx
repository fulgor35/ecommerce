import { stripe } from '../../../lib/stripe'
import { prisma } from '../../../lib/prisma'
import Link from 'next/link'

export default async function CheckoutExitoPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    const { session_id } = await searchParams

    if (!session_id) {
        return (
            <main className="p-8 max-w-2xl mx-auto text-center">
                <h1 className="text-2xl font-bold">
                    No se encontró la sesión de pago
                </h1>
            </main>
        )
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
    })

    const ordenExistente = await prisma.orden.findUnique({
        where: { stripeId: session_id },
    })

    if (!ordenExistente && session.payment_status === 'paid') {
        await prisma.orden.create({
            data: {
                email: session.customer_details?.email ?? 'sin-email',
                total: (session.amount_total ?? 0) / 100,
                estado: 'pagado',
                stripeId: session_id,
                items: {
                    create: session.line_items?.data.map((item) => ({
                        productoId: item.price?.product as string,
                        nombre: item.description ?? 'Producto',
                        precio: (item.price?.unit_amount ?? 0) / 100,
                        cantidad: item.quantity ?? 1,
                    })),
                },
            },
        })
    }

    return (
        <main className="p-8 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
                ¡Gracias por tu compra! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
                Tu pago se procesó correctamente. Te enviamos un email con los
                detalles.
            </p>
            <Link href="/productos" className="text-blue-600 underline">
                Seguir comprando
            </Link>
        </main>
    )
}
