import * as z from "zod";

export const eventSchema = z.object({
  event: z.string().min(1),
  page: z.string().optional(),
  timestamp: z.number().int().optional(),
  duration: z.number().int().optional(),
  x: z.number().int().optional(),
  y: z.number().int().optional(),
});

export type EventInput = z.infer<typeof eventSchema>;
