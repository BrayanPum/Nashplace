import {z} from 'zod'

export const createTaskSchema = z.object({
    nombre: z.string({
        required_error: "Nombre Requerido",
    }),
    descripcion: z.string({
        required_error: "Descripcion requerida",
    }),
    precio: z.string({
        required_error: "Precio Requerido",
    }),
    stock: z.string({
        required_error: "Stock Requerido",
    }),
    link: z.string({
        required_error: "Stock Requerido",
    })
})