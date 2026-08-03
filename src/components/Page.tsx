import React from 'react';
import Header from './Header';
import StatSection from '../features/subscriptions/ui/StatSection';
import SubscriptionList from '../features/subscriptions/ui/SubscriptionList';
import SubscriptionsHeader from '../features/subscriptions/ui/SubscriptionsHeader';
import ModalComponent from './ModalComponent';
import type { SubscriptionPut } from '../features/subscriptions/domain/subscription';
import useDebounce from '../hooks/useDebounce';
import { ownershipTypeOptions, sortOptions } from '../types/ui/options';

const SubscriptionForm = React.lazy(
  () => import('../features/subscriptions/ui/SubscriptionForm'),
);

const Page = () => {
  const [term, setTerm] = React.useState('');
  const [sort, setSort] = React.useState(sortOptions[0]);
  const [ownershipType, setOwnershipType] = React.useState(
    ownershipTypeOptions[0],
  );
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(5);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<SubscriptionPut | null>(
    null,
  );

  const debouncedQuery = useDebounce(term, 500);

  const handleCloseModal = React.useCallback(() => {
    setActiveItem(null);
    setIsModalOpen(false);
  }, []);

  // React.useEffect(() => {
  //   setPage(0);
  // }, [debouncedQuery, sort, ownershipType]);

  return (
    <>
      <Header setIsModalOpen={setIsModalOpen} />
      <StatSection
        ownershipType={ownershipType}
      />
      <SubscriptionsHeader
        term={term}
        setTerm={setTerm}
        sort={sort}
        setSort={setSort}
        ownershipType={ownershipType}
        setOwnershipType={setOwnershipType}
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
        debouncedQuery={debouncedQuery}
      />
      <SubscriptionList
        setIsModalOpen={setIsModalOpen}
        setActiveItem={setActiveItem}
        term={debouncedQuery}
        sort={sort}
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        ownershipType={ownershipType}
      />
      <ModalComponent
        formId="subscription-form"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCloseModal={handleCloseModal}
        title={
          activeItem
            ? 'Editar assinatura existente'
            : 'Adicionar nova assinatura'
        }
        buttonLabel={activeItem ? 'Salvar' : 'Adicionar'}
        isMutatingLabel={activeItem ? 'Salvando...' : 'Adicionando...'}
      >
        {isModalOpen && (
          <React.Suspense
            fallback={
              <div className="py-10 text-center text-sm text-neutral-500">
                Carregando formulário...
              </div>
            }
          >
            <SubscriptionForm
              key={activeItem ? activeItem.id : 'new'}
              setActiveItem={setActiveItem}
              activeItem={activeItem}
              handleCloseModal={handleCloseModal}
            />
          </React.Suspense>
        )}
      </ModalComponent>
    </>
  );
};

export default Page;
