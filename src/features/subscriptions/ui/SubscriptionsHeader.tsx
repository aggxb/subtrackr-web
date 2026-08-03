import SelectComponent from '../../../components/SelectComponent';
import SubscriptionCounter from '../ui/SubscriptionCounter';
import type { SubscriptionFilters } from '../../../types/ui/filters';
import SearchComponent from '../../../components/SearchComponent';
import { ownershipTypeOptions, sortOptions } from '../../../types/ui/options';

const SubscriptionsHeader = ({
  term,
  sort,
  page,
  size,
  ownershipType,
  setPage,
  setTerm,
  setSort,
  setOwnershipType,
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
          value={term || ''}
          onChange={(event) => {
            setTerm(event.target.value);

            setPage(0);
          }}
        />
        <div className="flex gap-4 items-center justify-end max-sm:justify-between">
          <SelectComponent
            options={ownershipTypeOptions}
            labelKey="label"
            valueKey="value"
            value={ownershipType?.value}
            onChange={(value) => {
              const selected = ownershipTypeOptions.find(
                (option) => option.value === value,
              );

              if (selected) setOwnershipType(selected);

              setPage(0);
            }}
          />
          <SelectComponent
            options={sortOptions}
            labelKey="label"
            valueKey="value"
            value={sort?.value}
            onChange={(value) => {
              const selected = sortOptions.find(
                (option) => option.value === value,
              );

              if (selected) setSort(selected);

              setPage(0);
            }}
          />
          <SubscriptionCounter
            sort={sort}
            term={debouncedQuery}
            page={page}
            size={size}
            ownershipType={ownershipType}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsHeader;
