import { prisma } from '../../../lib/prisma'

export default async function AdminOrdenesPage() {
    const ordenes = await prisma.orden.findMany({
        include: { items: true },
        orderBy: { creadoEn: 'desc' },
    })

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Órdenes</h1>
            <div className="flex flex-col gap-4">
                {ordenes.map((orden) => (
                    <div key={orden.id} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                            <p className="font-semibold">{orden.email}</p>
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                {orden.estado}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                            {new Date(orden.creadoEn).toLocaleString('es-AR')}
                        </p>
                        <ul className="text-sm mb-2">
                            {orden.items.map((item) => (
                                <li key={item.id}>
                                    {item.cantidad}x {item.nombre} - $
                                    {item.precio.toLocaleString('es-AR')}
                                </li>
                            ))}
                        </ul>
                        <p className="font-bold">
                            Total: ${orden.total.toLocaleString('es-AR')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
