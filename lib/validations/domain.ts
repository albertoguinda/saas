import * as z from "zod";

export const domainSchema = z.object({
  name: z
    .string()
    .min(1, "Dominio requerido")
    .regex(/^[a-zA-Z0-9.-]+$/, "Dominio inválido")
    .refine((v) => !/^https?:\/\//.test(v), {
      message: "Dominio inválido",
    }),
});

export type DomainInput = z.infer<typeof domainSchema>;
