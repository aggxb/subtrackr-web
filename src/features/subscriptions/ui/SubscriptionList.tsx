import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { subscriptionService } from '../api/subscription-service';
import type { SubscriptionPut } from '../domain/subscription';
import type { FilterValues } from '../../../types/ui/filters';
import type { ModalInfo } from '../../../types/ui/modal';
import SubscriptionComponent from './SubscriptionComponent';
import { ScrollShadow } from '@heroui/react';
import SubscriptionSkeleton from './SubscriptionSkeleton';
import { motion, AnimatePresence } from 'motion/react';

type SubscriptionListProps = FilterValues &
  Pick<ModalInfo, 'setIsModalOpen'> & {
    setActiveItem: React.Dispatch<React.SetStateAction<SubscriptionPut | null>>;
  };

const SubscriptionList = ({
  query,
  order,
  setIsModalOpen,
  setActiveItem,
}: SubscriptionListProps) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['subscriptions', query, order],
    queryFn: () => subscriptionService.getAll(query, order),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    return (
      <div className="container w-full">
        <div className="h-100 flex place-content-center place-items-center border-2 border-dotted border-red-600/20 rounded-2xl">
          <p className="text-red-600/20 font-medium text-center">
            Não foi possível encontrar os dados.{' '}
            <span
              className="underline underline-offset-4 cursor-pointer"
              onClick={() => window.location.reload()}
            >
              Tente novamente.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="container">
        <div className=" w-full h-100 flex place-content-center place-items-center border-2 border-dotted border-neutral-600 rounded-2xl">
          <p className="text-neutral-600 font-medium text-center">
            Nenhuma assinatura encontrada...
          </p>
        </div>
      </div>
    );
  }

  if (data && data.length) {
    return (
      <div>
        <ScrollShadow className="container max-h-157.5 pb-8 overflow-y-auto overflow-x-hidden scroll">
          {isPending ? (
            <ul className="grid gap-4">
              <SubscriptionSkeleton />
              <SubscriptionSkeleton />
              <SubscriptionSkeleton />
              <SubscriptionSkeleton />
            </ul>
          ) : (
            <motion.ul className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {data.map((subscription, index) => (
                  <SubscriptionComponent
                    key={subscription.id}
                    setIsModalOpen={setIsModalOpen}
                    setActiveItem={setActiveItem}
                    index={index}
                    {...subscription}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </ScrollShadow>
      </div>
    );
  }
};

export default SubscriptionList;
