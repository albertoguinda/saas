import * as z from "zod";

export const feedbackSchema = z.object({
  message: z.string().min(3, "Mensaje requerido"),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
