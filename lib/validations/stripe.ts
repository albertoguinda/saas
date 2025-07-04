import * as z from 'zod';

export const createCustomerSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
});

export const subscribeSchema = z.object({
  customerId: z.string(),
  priceId: z.string(),
});

export const cancelSchema = z.object({
  subscriptionId: z.string(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type CancelInput = z.infer<typeof cancelSchema>;
