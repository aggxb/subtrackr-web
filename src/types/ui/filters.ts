import type React from 'react';

// interface -> representa as informações utilizadas na filtragem de assinaturas
export type SubscriptionFilters = {
  term?: string;
  sort?: SortOptions;
  page?: number;
  size?: number;
  ownershipType?: OwnershipType;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<SortOptions>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setOwnershipType: React.Dispatch<React.SetStateAction<OwnershipType>>;
  debouncedQuery?: string;
};

// interface -> representa os valores dos filtros de assinaturas
export type QueryParams = Pick<
  SubscriptionFilters,
  'term' | 'sort' | 'page' | 'size' | 'ownershipType' | 'setPage' | 'setSize'
>;

// interface -> representa as informações necessárias na ordenação das assinaturas
export type GenericObjType = {
  id: number;
  label: string;
  value: string;
};

export type SortOptions = GenericObjType;

export type OwnershipType = GenericObjType;
