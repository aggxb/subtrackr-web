import { useQuery } from '@tanstack/react-query';
import StatCard from '../../../components/StatCard';
import { CalendarDays, CreditCard, DollarSign } from 'lucide-react';
import { subscriptionService } from '../api/subscription-service';
import StatCardSkeleton from '../../../components/StatCardSkeleton';
import StatCardError from '../../../components/StatCardError';
import React from 'react';
import type { QueryParams } from '../../../types/ui/filters';

const StatSection = ({ ownershipType }: Pick<QueryParams, 'ownershipType'>) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['summary', ownershipType],
    queryFn: () => subscriptionService.getSummary(ownershipType),
  });

  if (isError) {
    return (
      <section className="container grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[900px]:*:last:col-span-full max-sm:grid-cols-1">
        <StatCardError />
        <StatCardError />
        <StatCardError />
      </section>
    );
  }

  if (data) {
    return (
      <section className="container grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[900px]:*:last:col-span-full max-sm:grid-cols-1">
        {isPending ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              isCurrency
              value={data.totalMonthlySpend}
              icon={DollarSign}
            >
              Gasto Mensal
            </StatCard>
            <StatCard
              isCurrency
              value={data.totalYearlySpend}
              icon={CalendarDays}
            >
              Gasto Anual
            </StatCard>
            <StatCard value={data.activeSubscriptionsCount} icon={CreditCard}>
              Assinaturas Ativas
            </StatCard>
          </>
        )}
      </section>
    );
  }
};

export default React.memo(StatSection);
