import { Input } from '@headlessui/react';
import { type LucideIcon } from 'lucide-react';
import { normalizeLabelAndValue } from '../utils/normalizeLabelAndValue';

type InputProps = React.ComponentProps<'input'> & {
  label?: string;
  icon?: LucideIcon;
};

const InputField = ({ label, icon: Icon, ...props }: InputProps) => {
  return (
    <div className="grid gap-1 w-full min-w-68 max-md:min-w-auto">
      {label && (
        <label className="text-sm font-medium text-neutral-200" htmlFor={label}>
          {normalizeLabelAndValue(label)}
        </label>
      )}
      <div className="flex items-center gap-3 bg-neutral-900 h-9 px-4 rounded-3xl text-neutral-400 border border-neutral-800">
        {Icon && <Icon size={18} />}
        <Input
          type="search"
          id={label}
          {...props}
          className="input p-0 w-full text-sm outline-none border-none py-2"
        />
      </div>
    </div>
  );
};

export default InputField;
