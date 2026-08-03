import {
  PageSchema,
  SubscriptionSchema,
  SummarySchema,
} from '../domain/subscription';
import {
  type SubscriptionPut,
  type SubscriptionPost,
} from '../domain/subscription';
import { subtrackrAPI } from '../../../services/api';
import type { OwnershipType } from '../../../types/ui/filters';

export const subscriptionService = {
  getAll: async (
    term?: string,
    sort?: string,
    page?: number,
    size?: number,
    ownershipType?: OwnershipType,
  ) => {
    const response = await subtrackrAPI.get('', {
      params: {
        term: term?.length ? term : null,
        sort: sort?.length ? sort : null,
        page: page ? page : null,
        size: size ? size : null,
        ownershipType: ownershipType?.value.length ? ownershipType.value : null,
      },
    });

    return PageSchema.parse(response.data);
  },
  getSummary: async (ownershipType?: OwnershipType) => {
    const response = await subtrackrAPI.get('/summary', {
      params: {
        ownershipType: ownershipType?.value.length ? ownershipType.value : null,
      },
    });
    return SummarySchema.parse(response.data);
  },
  postSubscription: async (data: SubscriptionPost) => {
    const response = await subtrackrAPI.post('', data);
    return SubscriptionSchema.parse(response.data);
  },
  patchSubscription: async (data: SubscriptionPut) => {
    await subtrackrAPI.patch(`/${data.id}`, data);
    return;
  },
  toggleSubscriptionStatus: async (id: string) => {
    await subtrackrAPI.patch(`/toggle/${id}`);
    return;
  },
  deleteSubscription: async (id: string) => {
    await subtrackrAPI.delete(`/${id}`);
    return;
  },
};
