import * as z from "zod";

export const eventSchema = z.object({
  event: z.string().min(1, "Evento requerido"),
  page: z.string().optional(),
  timestamp: z.number().optional(),
  duration: z.number().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
});

export type EventInput = z.infer<typeof eventSchema>;
