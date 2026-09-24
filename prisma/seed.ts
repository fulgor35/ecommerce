import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    await prisma.producto.createMany({
        data: [
            {
                nombre: 'Zapatillas Urbanas',
                descripcion: 'Zapatillas cómodas para el día a día',
                precio: 49999,
                imagenUrl: 'https://picsum.photos/seed/zapatillas/400/400',
                stock: 15,
            },
            {
                nombre: 'Mochila Antirrobo',
                descripcion:
                    'Mochila resistente con compartimento para notebook',
                precio: 29999,
                imagenUrl: 'https://picsum.photos/seed/mochila/400/400',
                stock: 8,
            },
            {
                nombre: 'Auriculares Bluetooth',
                descripcion: 'Sonido envolvente con cancelación de ruido',
                precio: 39999,
                imagenUrl: 'https://picsum.photos/seed/auriculares/400/400',
                stock: 20,
            },
        ],
    })
    console.log('Seed completado ✅')
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
