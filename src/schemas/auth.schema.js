import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  identificacion: z.string({
    required_error: "La identificacion es requerida",
  }),
  correoElectronico: z
    .string({
      required_error: "El correo es requerido ñero",
    })
    .email({
      message: "Correo Invalido",
    }),
  telefono: z.string({
    required_error: "El telefono es requerido",
  }),
  username: z.string({
    required_error: "El usuario es requerido",
  }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "Contraseña tiene que ser mayor a 6 caracteres",
    }),
});

export const loginSchema = z.object({
  username: z.string({
    required_error: "El usuario es requerido",
  }),
  password: z.string({
    required_error: "La contraseña es requerida",
  })
  .min(6, {
    message: "La contraseña tiene que ser mayor a 6 caracteres",
  }),
});
