import * as z from "zod";

export const domainSchema = z.object({
  name: z
    .string()
    .min(1, "Dominio requerido")
    .regex(/^[a-zA-Z0-9.-]+$/, "Dominio inválido")
    .refine((v) => !/^https?:\/\//.test(v), {
      message: "Dominio inválido",
    }),
  siteId: z.string().optional(),
});

export const verifySchema = z.object({
  id: z.string().min(1, "ID requerido"),
});

export type DomainInput = z.infer<typeof domainSchema>;
