// interface -> representa as informações utilizadas na filtragem de assinaturas
export type SubscriptionFilters = {
  query: string | null;
  order: OptionProps;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<OptionProps>>;
  debouncedQuery: string | null;
};

// interface -> representa os valores dos filtros de assinaturas
export type FilterValues = Pick<SubscriptionFilters, 'query' | 'order'>;

// interface -> representa as informações necessárias na ordenação das assinaturas
export type OptionProps = {
  id: number;
  label: string;
  value: string;
};