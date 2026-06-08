import * as z from 'zod';

export const SubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  cycle: z.enum(['MONTHLY', 'YEARLY']),
  dueDate: z.number(),
  status: z.enum(['ACTIVE', 'CANCELED']),
  createdAt: z.string(),
  modifiedAt: z.string().nullable(),
});

export const SubscriptionSchemaArray = z.array(SubscriptionSchema);

export const SummarySchema = z.object({
  totalMonthlySpend: z.number(),
  totalYearlySpend: z.number(),
  activeSubscriptionsCount: z.number(),
});
