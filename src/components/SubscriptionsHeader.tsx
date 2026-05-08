import SelectComponent from './SelectComponent';
import SubscriptionCounter from './SubscriptionCounter';
import type { SubscriptionFilters } from '../types/types';
import SearchComponent from './SearchComponent';

const sortOptions = [
  { id: 1, label: 'Data de criação', value: '' },
  { id: 2, label: 'Nome A-Z', value: 'name_asc' },
  { id: 3, label: 'Nome Z-A', value: 'name_desc' },
  { id: 4, label: 'Maior preço', value: 'price_desc' },
  { id: 5, label: 'Menor preço', value: 'price_asc' },
];

const SubscriptionsHeader = ({
  query,
  setQuery,
  order,
  setOrder,
  debouncedQuery,
}: SubscriptionFilters) => {
  return (
    <div className="container flex items-center gap-5 py-8 md:justify-between max-md:grid">
      <h2 className="text-lg font-medium">Suas assinaturas</h2>
      <div className="grid grid-cols-2 justify-between items-center gap-4 max-sm:grid-cols-1">
        <SearchComponent
          name="search"
          placeholder="Buscar assinatura..."
          aria-label="Buscar assinatura"
          value={query || ''}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="flex gap-4 items-center justify-end max-sm:justify-between">
          <SelectComponent
            options={sortOptions}
            value={order.value}
            onChange={(value) => {
              const selected = sortOptions.find(
                (option) => option.value === value,
              );

              if (selected) setOrder(selected);
            }}
          />
          <SubscriptionCounter order={order} query={debouncedQuery} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsHeader;
