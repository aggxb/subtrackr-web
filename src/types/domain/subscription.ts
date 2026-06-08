// domínio -> representa a entidade que vem do banco de dados
export interface Subscription {
  id: string;
  name: string;
  price: number;
  cycle: 'MONTHLY' | 'YEARLY';
  dueDate: number;
  status: 'ACTIVE' | 'CANCELED';
  createdAt: string;
  modifiedAt: string | null;
}

// domínio -> representa o payload de criação de um novo registro
export type SubscriptionPost = Omit<
  Subscription,
  'id' | 'createdAt' | 'modifiedAt'
>;

// domínio -> representa o payload de edição de um registro
export type SubscriptionPut = Omit<Subscription, 'createdAt' | 'modifiedAt'>;

// domínio -> representa o retorno do sumário do banco de dados
export interface Summary {
  totalMonthlySpend: number;
  totalYearlySpend: number;
  activeSubscriptionsCount: number;
}
