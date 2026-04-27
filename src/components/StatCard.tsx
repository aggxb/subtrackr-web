import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

type CardProps = React.ComponentProps<'div'> & {
  isCurrency?: boolean;
  value: string | number;
  icon: LucideIcon;
};

const StatCard = ({ children, value, isCurrency, icon: Icon }: CardProps) => {
  return (
    <div className="group px-4 py-8 rounded-2xl bg-neutral-900 border border-neutral-800 transition transition-discrete duration-500 **:transition **:transition-discrete **:duration-500 hover:ring hover:ring-blue-700 hover:shadow-sm hover:shadow-blue-600 max-sm:px-3 max-sm:py-6">
      <div className="flex flex-row justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-600 mb-2">
            {children}
          </p>
          <p className="text-3xl font-semibold max-sm:text-2xl">{isCurrency ? formatCurrency(value) : value}</p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-800 group-hover:bg-sky-950">
          <Icon className="text-neutral-600 group-hover:text-blue-300 group-hover:animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
