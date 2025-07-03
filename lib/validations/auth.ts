import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
