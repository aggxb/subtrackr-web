export interface Subscription {
  id: number;
  name: string;
  price: number;
  cycle: 'MONTHLY' | 'YEARLY';
  dueDate: number;
  status: 'ACTIVE' | 'CANCELED';
  createdAt: string;
  modifiedAt: string;
}

export type SubscriptionPost = Omit<
  Subscription,
  'id' | 'createdAt' | 'modifiedAt'
>;

export type SubscriptionPut = Omit<Subscription, 'createdAt' | 'modifiedAt'>;

export interface Summary {
  totalMonthlySpend: number;
  totalYearlySpend: number;
  activeSubscriptionsCount: number;
}

export type ModalInfo = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
  formId?: string;
  buttonLabel?: string;
  isMutatingLabel?: string;
};

export type SubscriptionFilters = {
  query: string | null;
  order: OptionProps;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<OptionProps>>;
  debouncedQuery: string | null;
};

export type FilterValues = Pick<SubscriptionFilters, 'query' | 'order'>;

export type OptionProps = {
  id: number;
  label: string;
  value: string;
};
