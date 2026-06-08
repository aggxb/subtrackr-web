import {
  SubscriptionSchema,
  SubscriptionSchemaArray,
  SummarySchema,
} from '../schemas/domain/subscription';
import {
  type SubscriptionPut,
  type Subscription,
  type SubscriptionPost,
} from '../types/domain/subscription';
import { type OptionProps } from '../types/ui/filters';
import { subtrackrAPI } from './api';

export const subscriptionService = {
  getAll: async (query?: string | null, order?: OptionProps) => {
    const response = await subtrackrAPI.get('/subscriptions', {
      params: {
        query: query?.length ? query : null,
        sort:
          order?.value && order?.value !== 'default'
            ? order?.value?.toUpperCase()
            : null,
      },
    });

    return SubscriptionSchemaArray.parse(response.data);
  },
  getSummary: async () => {
    const response = await subtrackrAPI.get('/subscriptions/summary');
    return SummarySchema.parse(response.data);
  },
  postSubscription: async (data: SubscriptionPost) => {
    const response = await subtrackrAPI.post('/subscriptions', data);
    return SubscriptionSchema.parse(response.data);
  },
  putSubscription: async (data: SubscriptionPut) => {
    await subtrackrAPI.put(`/subscriptions/${data.id}`, data);
    return;
  },
  patchSubscriptionStatus: async (data: Pick<Subscription, 'id'>) => {
    await subtrackrAPI.patch(`/subscriptions/toggle/${data.id}`, data);
    return;
  },
  deleteSubscription: async (id: string) => {
    await subtrackrAPI.delete(`/subscriptions/${id}`);
    return;
  },
};
