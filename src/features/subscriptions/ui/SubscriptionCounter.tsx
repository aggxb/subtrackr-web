import { useQuery } from '@tanstack/react-query';
import type { SubscriptionFilters } from '../../../types/ui/filters';
import { subscriptionService } from '../api/subscription-service';

const SubscriptionCounter = ({
  term,
  sort,
  page,
  size,
  ownershipType,
}: Pick<
  SubscriptionFilters,
  'term' | 'sort' | 'page' | 'size' | 'ownershipType'
>) => {
  const { data } = useQuery({
    queryKey: ['subscriptions', term, sort, page, size, ownershipType?.value],
    queryFn: () =>
      subscriptionService.getAll(term, sort?.value, page, size, ownershipType),
    select: (data) => data.content.length,
  });

  const count = data ?? 0;

  return (
    <span className="text-sm text-neutral-500">
      {count} {count !== 1 ? 'itens' : 'item'}
    </span>
  );
};

export default SubscriptionCounter;
