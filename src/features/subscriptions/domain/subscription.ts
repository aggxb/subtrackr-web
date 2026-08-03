import * as z from 'zod';

export const SubscriptionSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3, 'O nome deve ter, pelo menos, 3 caracteres'),
  price: z.number().positive('O valor deve ser maior que zero'),
  cycle: z.enum(['MONTHLY', 'YEARLY']),
  dueDate: z
    .number()
    .min(1, 'O dia de vencimento deve estar entre 1 e 31')
    .max(31, 'O dia de vencimento deve estar entre 1 e 31'),
  ownershipType: z.enum(['PERSONAL', 'THIRD_PARTY']),
  status: z.boolean(),
  createdAt: z.string(),
  modifiedAt: z.string().nullable(),
});

export const PageSchema = z.object({
  content: z.array(SubscriptionSchema),
  totalElements: z.number(),
  totalPages: z.number(),
  number: z.number(),
  size: z.number(),
  first: z.boolean(),
  last: z.boolean(),
});

export const SubscriptionPostSchema = SubscriptionSchema.omit({
  id: true,
  createdAt: true,
  modifiedAt: true,
  status: true,
});

export const SubscriptionPutSchema = SubscriptionSchema.omit({
  createdAt: true,
  modifiedAt: true,
});

export const SubscriptionSchemaArray = z.array(SubscriptionSchema);

export const SummarySchema = z.object({
  totalMonthlySpend: z.number(),
  totalYearlySpend: z.number(),
  activeSubscriptionsCount: z.number(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export type SubscriptionPost = z.infer<typeof SubscriptionPostSchema>;

export type SubscriptionPut = z.infer<typeof SubscriptionPutSchema>;
