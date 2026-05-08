import { type SubscriptionPut, type OptionProps, type Subscription, type SubscriptionPost, type Summary } from '../types/types';
import { subtrackrAPI } from './api';

export const subscriptionService = {
  getAll: async (query?: string | null, order?: OptionProps) => {
    const response = await subtrackrAPI.get<Subscription[]>('/subscriptions', {
      params: {
        query: query?.length ? query : null,
        sort: order?.value?.toUpperCase() || null,
      },
    });
    return response.data;
  },
  getSummary: async () => {
    const response = await subtrackrAPI.get<Summary>('/subscriptions/summary');
    return response.data;
  },
  postSubscription: async (data: SubscriptionPost) => {
    const response = await subtrackrAPI.post<Subscription>('/subscriptions', data);
    return response.data;
  },
  putSubscription: async (data: SubscriptionPut) => {
    const response = await subtrackrAPI.put<SubscriptionPut>(`/subscriptions/${data.id}`, data);
    return response.data;
  },
  patchSubscriptionStatus: async (data: Pick<Subscription, "id">) => {
    const response = await subtrackrAPI.patch<Pick<Subscription, "id">>(`/subscriptions/toggle/${data.id}`, data);
    return response.data;
  },
  deleteSubscription: async(id: number) => {
    const response = await subtrackrAPI.delete<Subscription>(`/subscriptions/${id}`);
    return response.data;
  }
};
