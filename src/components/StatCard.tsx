import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { type LucideIcon } from 'lucide-react';
import { Card } from '@heroui/react';

type CardProps = React.ComponentProps<'div'> & {
  isCurrency?: boolean;
  value: string | number;
  icon: LucideIcon;
};

const StatCard = ({ children, value, isCurrency, icon: Icon }: CardProps) => {
  return (
    <Card className="group px-4 py-8 flex flex-row justify-between bg-neutral-900 border border-neutral-800 transition transition-discrete duration-500 **:transition **:transition-discrete **:duration-500 hover:border-blue-700 hover:shadow-xs hover:shadow-blue-600 max-sm:px-3 max-sm:py-6">
      <div>
        <Card.Header>
          <Card.Title className="font-medium text-neutral-600 mb-2">
            {children}
          </Card.Title>
        </Card.Header>
        <Card.Description className="text-3xl text-neutral-50 font-semibold max-sm:text-2xl">
          {isCurrency ? formatCurrency(value) : value}
        </Card.Description>
      </div>
      <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-800 group-hover:bg-sky-950">
        <Icon className="text-neutral-600 group-hover:text-blue-300 group-hover:animate-pulse" />
      </div>
    </Card>
  );
};

export default StatCard;
