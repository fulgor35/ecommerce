import { crearProducto } from '../../../actions/productos'

export default function NuevoProductoPage() {
    return (
        <div className="max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Nuevo producto</h1>
            <form action={crearProducto} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    required
                    className="border rounded-md p-2"
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    required
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    step="0.01"
                    name="precio"
                    placeholder="Precio"
                    required
                    className="border rounded-md p-2"
                />
                <input
                    type="text"
                    name="imagenUrl"
                    placeholder="URL de la imagen"
                    required
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    required
                    className="border rounded-md p-2"
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
                >
                    Crear producto
                </button>
            </form>
        </div>
    )
}
