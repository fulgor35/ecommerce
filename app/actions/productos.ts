'use server'

import { prisma } from '../../lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function crearProducto(formData: FormData) {
    const nombre = formData.get('nombre') as string
    const descripcion = formData.get('descripcion') as string
    const precio = Number(formData.get('precio'))
    const imagenUrl = formData.get('imagenUrl') as string
    const stock = Number(formData.get('stock'))

    await prisma.producto.create({
        data: { nombre, descripcion, precio, imagenUrl, stock },
    })

    revalidatePath('/admin/productos')
    redirect('/admin/productos')
}

export async function actualizarProducto(id: string, formData: FormData) {
    const nombre = formData.get('nombre') as string
    const descripcion = formData.get('descripcion') as string
    const precio = Number(formData.get('precio'))
    const imagenUrl = formData.get('imagenUrl') as string
    const stock = Number(formData.get('stock'))

    await prisma.producto.update({
        where: { id },
        data: { nombre, descripcion, precio, imagenUrl, stock },
    })

    revalidatePath('/admin/productos')
    redirect('/admin/productos')
}

export async function eliminarProducto(id: string) {
    await prisma.producto.delete({ where: { id } })
    revalidatePath('/admin/productos')
}
