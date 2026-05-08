import { useQuery } from '@tanstack/react-query';
import type { SubscriptionFilters } from '../types/types';
import { subscriptionService } from '../services/subscription';

const SubscriptionCounter = ({
  query,
  order,
}: Pick<SubscriptionFilters, 'query' | 'order'>) => {
  const { data } = useQuery({
    queryKey: ['subscriptions', query, order],
    queryFn: () => subscriptionService.getAll(query, order),
    select: (data) => data.length,
  });

  const count = data ?? 0;

  return (
    <span className="text-sm text-neutral-500">
      {count} {count !== 1 ? 'itens' : 'item'}
    </span>
  );
};

export default SubscriptionCounter;
