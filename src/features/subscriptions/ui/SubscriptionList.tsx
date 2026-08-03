import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { subscriptionService } from '../api/subscription-service';
import type { SubscriptionPut } from '../domain/subscription';
import type { QueryParams } from '../../../types/ui/filters';
import type { ModalInfo } from '../../../types/ui/modal';
import SubscriptionComponent from './SubscriptionComponent';
import { Pagination, ScrollShadow } from '@heroui/react';
import SubscriptionSkeleton from './SubscriptionSkeleton';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';

type SubscriptionListProps = QueryParams &
  Pick<ModalInfo, 'setIsModalOpen'> & {
    setActiveItem: React.Dispatch<React.SetStateAction<SubscriptionPut | null>>;
  };

const SubscriptionList = ({
  term,
  sort,
  setPage,
  page,
  size,
  ownershipType,
  setIsModalOpen,
  setActiveItem,
}: SubscriptionListProps) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['subscriptions', term, sort, ownershipType, page, size],
    queryFn: () =>
      subscriptionService.getAll(term, sort?.value, page, size, ownershipType),
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

  if (data?.content.length === 0) {
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

  if (data && data.content.length) {
    return (
      <div>
        <ScrollShadow className="container pb-8 ">
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
                {data.content.map((subscription, index) => (
                  <SubscriptionComponent
                    key={subscription.id}
                    setIsModalOpen={setIsModalOpen}
                    setActiveItem={setActiveItem}
                    index={index}
                    {...subscription}
                  />
                ))}
                <Pagination className="justify-end">
                  <Pagination.Content>
                    <Pagination.Item className="grid gap-4">
                      <Pagination.Previous
                        isDisabled={page === 0}
                        onPress={() => setPage((p) => p - 1)}
                      >
                        <Pagination.PreviousIcon />
                        <span>Ant.</span>
                      </Pagination.Previous>
                    </Pagination.Item>
                    {Array.from(
                      { length: data.totalPages },
                      (_, i) => i + 1,
                    ).map((p) => (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p - 1 === page}
                          onPress={() => setPage(p - 1)}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ))}
                    <Pagination.Item>
                      <Pagination.Next
                        isDisabled={page as number + 1 === data.totalPages}
                        onPress={() => setPage((p) => p + 1)}
                      >
                        <span>Próx.</span>
                        <Pagination.NextIcon />
                      </Pagination.Next>
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </AnimatePresence>
            </motion.ul>
          )}
        </ScrollShadow>
      </div>
    );
  }
};

export default SubscriptionList;
