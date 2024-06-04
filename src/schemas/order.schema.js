import { z } from 'zod';

export const createOrderSchema = z.object({
  nombre: z.string({
    required_error: "Nombre requerido",
  }),
  email: z.string({
    required_error: "Email requerido",
  }).email("Email no válido"),
  telefono: z.string({
    required_error: "Teléfono requerido",
  }),
  cart: z.array(z.object({
    _id: z.string(),
    nombre: z.string(),
    cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
    total: z.number().min(0, "El total debe ser un número positivo")
  })).nonempty("El carrito no puede estar vacío"),
  totalPedido: z.number().min(0, "El total del pedido debe ser un número positivo")
});
