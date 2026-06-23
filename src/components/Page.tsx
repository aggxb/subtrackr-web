import React from 'react';
import Header from './Header';
import StatSection from '../features/subscriptions/ui/StatSection';
import SubscriptionList from '../features/subscriptions/ui/SubscriptionList';
import SubscriptionsHeader from '../features/subscriptions/ui/SubscriptionsHeader';
import ModalComponent from './ModalComponent';
import SubscriptionForm from '../features/subscriptions/ui/SubscriptionForm';
import type { SubscriptionPut } from '../features/subscriptions/domain/subscription';
import useDebounce from '../hooks/useDebounce';

const options = [
  { id: 1, label: 'Data de criação', value: '' },
  { id: 2, label: 'Nome A-Z', value: 'name_asc' },
  { id: 3, label: 'Nome Z-A', value: 'name_desc' },
  { id: 4, label: 'Maior preço', value: 'price_desc' },
  { id: 5, label: 'Menor preço', value: 'price_asc' },
];

const Page = () => {
  const [query, setQuery] = React.useState('');
  const [order, setOrder] = React.useState(options[0]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<SubscriptionPut | null>(
    null,
  );

  const debouncedQuery = useDebounce(query, 500);

  const handleCloseModal = () => {
    setActiveItem(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Header setIsModalOpen={setIsModalOpen} />
      <StatSection />
      <SubscriptionsHeader
        query={query}
        setQuery={setQuery}
        order={order}
        setOrder={setOrder}
        debouncedQuery={debouncedQuery}
      />
      <SubscriptionList
        setIsModalOpen={setIsModalOpen}
        setActiveItem={setActiveItem}
        query={debouncedQuery}
        order={order}
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
        <SubscriptionForm
          key={activeItem ? activeItem.id : 'new'}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          handleCloseModal={handleCloseModal}
        />
      </ModalComponent>
    </>
  );
};

export default Page;
