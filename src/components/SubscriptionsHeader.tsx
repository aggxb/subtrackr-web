import InputField from './InputField';
import { ArrowDownUp, Search } from 'lucide-react';
import SelectField from './SelectField';
import SubscriptionCounter from './SubscriptionCounter';

const options = [
  { id: 1, label: 'Data de criação', value: 'creation' },
  { id: 2, label: 'Nome A-Z', value: 'name_asc' },
  { id: 3, label: 'Nome Z-A', value: 'name_desc' },
  { id: 4, label: 'Maior preço', value: 'price_desc' },
  { id: 5, label: 'Menor preço', value: 'price_asc' },
];

const SubscriptionsHeader = () => {
  return (
    <div className="container flex items-center gap-5 py-8 md:justify-between max-md:grid">
      <h2 className="text-lg font-medium">Suas assinaturas</h2>
      <div className="grid grid-cols-2 justify-between items-center gap-4 max-sm:grid-cols-1">
        <InputField placeholder="Buscar assinaturas..." icon={Search} />
        <div className="flex gap-4 items-center justify-end max-sm:justify-between">
          <SelectField options={options} icon={ArrowDownUp} />
          <SubscriptionCounter />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsHeader;
