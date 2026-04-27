import React from 'react';
import { Switch } from '@headlessui/react';
import { Pencil, Trash } from 'lucide-react';
import { normalizeLabelAndValue } from '../utils/normalizeLabelAndValue';
import { formatCurrency } from '../utils/formatCurrency';

type SubscriptionProps = {
  id?: number;
  name: string;
  dueDate: number;
  price: number;
  cycle: 'MONTHLY' | 'YEARLY' | string;
  status: 'ACTIVE' | 'CANCELED' | string;
};

const Subscription = ({
  name,
  dueDate,
  price,
  cycle,
  status,
}: SubscriptionProps) => {
  const [enabled, setEnabled] = React.useState(status);

  return (
    <div
      className={`group p-6 h-fit flex gap-3 items-center justify-between bg-neutral-900 rounded-2xl hover:ring hover:ring-blue-700 hover:shadow-sm hover:shadow-blue-600 transition transition-discrete duration-500 **:transition **:transition-discrete **:duration-500 max-sm:p-3 ${
        enabled !== 'ACTIVE' ? 'grayscale-75 brightness-70' : ''
      }`}
    >
      <div className="flex gap-4 items-start">
        <div className="size-14 p-4 flex items-center justify-center rounded-2xl text-lg font-semibold bg-neutral-800 max-sm:size-12 max-sm:text-sm max-[444px]:hidden">
          {name?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="grid">
          <h3 className="font-medium max-sm:text-sm">
            {normalizeLabelAndValue(name)}
          </h3>
          <p className="text-sm text-neutral-500 max-sm:text-xs">
            Vence dia {dueDate}
          </p>
          <span
            className={`mt-2 py-1 px-2.5 w-fit rounded-3xl font-medium text-xs transition transition-discrete duration-500 ${
              enabled !== 'ACTIVE'
                ? 'bg-orange-950 text-orange-400'
                : 'bg-emerald-950 text-emerald-400 '
            }`}
          >
            {enabled === 'ACTIVE' ? 'Ativo' : 'Cancelado'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5 max-sm:gap-2">
        <div className="flex gap-4">
          <div>
            <p className="font-medium max-sm:text-sm">
              {formatCurrency(price)}
            </p>
            <p className="text-xs text-end text-neutral-500">
              {cycle === 'MONTHLY' ? 'Mensal' : 'Anual'}
            </p>
          </div>
          <button className="group/button p-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 hover:bg-yellow-700/20 rounded-full cursor-pointer max-sm:visible max-sm:opacity-100">
            <Pencil
              size={16}
              className="text-neutral-500 group-hover:text-neutral-500 group-hover/button:text-yellow-500"
            />
          </button>
        </div>
        <Switch
          checked={enabled === 'ACTIVE'}
          onChange={() =>
            setEnabled(enabled === 'ACTIVE' ? 'CANCELED' : 'ACTIVE')
          }
          className="group relative flex h-5 w-10 cursor-pointer rounded-full bg-white/12 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-300/40 data-focus:outline data-focus:outline-white max-[440px]:w-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-3 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5 max-[440px]:group-data-checked:translate-x-3"
          />
        </Switch>
        <button className="group/button invisible opacity-0 p-3 group-hover:visible group-hover:opacity-100 hover:bg-red-700/20 rounded-full cursor-pointer max-sm:visible max-sm:opacity-100">
          <Trash
            size={16}
            className="text-neutral-500 group-hover:text-neutral-500 group-hover/button:text-red-500"
          />
        </button>
      </div>
    </div>
  );
};

export default Subscription;
