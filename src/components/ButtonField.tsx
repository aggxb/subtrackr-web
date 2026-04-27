import { Button } from '@headlessui/react';
import { type LucideIcon } from 'lucide-react';
import React from 'react';

type ButtonProps = React.ComponentProps<'button'> & {
  icon?: LucideIcon;
};

const ButtonField = ({ icon: Icon, children }: ButtonProps) => {
  return (
    <Button className="flex gap-2 px-5 py-1.5 h-fit rounded-3xl items-center text-sm font-medium text-neutral-950 bg-neutral-50 cursor-pointer transition transition-discrete duration-300 hover:shadow-md hover:shadow-neutral-200/20 max-sm:px-2.5 max-sm:text-xs">
      {Icon && <Icon size={16} />}
      {children}
    </Button>
  );
};

export default ButtonField;
