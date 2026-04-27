import React from 'react';
import { Check, ChevronDown, type LucideIcon } from 'lucide-react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { normalizeLabelAndValue } from '../utils/normalizeLabelAndValue';

type OptionProps = {
  id: number;
  label: string;
  value: string;
};

type SelectProps = React.ComponentProps<'select'> & {
  label?: string;
  icon?: LucideIcon;
  options: OptionProps[];
};

const SelectField = ({ label, icon: Icon, options }: SelectProps) => {
  const [selected, setSelected] = React.useState(options[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="grid gap-1">
        {label && (
          <label
            htmlFor={label}
            className="text-sm font-medium text-neutral-200"
          >
            {normalizeLabelAndValue(label)}
          </label>
        )}
        <div className="relative">
          <ListboxButton
            className="flex gap-2 px-4 py-2 items-center text-sm bg-neutral-900 rounded-3xl text-neutral-400 border border-neutral-800 cursor-pointer"
            id={label}
          >
            {Icon && <Icon size={18} />}
            <div className="flex gap-1 items-center justify-between">
              <span>{selected.label}</span>
              <ChevronDown size={14} />
            </div>
          </ListboxButton>

          <ListboxOptions
            anchor="bottom start"
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-2 text-sm text-neutral-400"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className="group flex justify-between cursor-pointer items-center gap-2 rounded-lg py-2 px-1"
              >
                <div>{option.label}</div>
                <Check className="invisible size-4 group-data-selected:visible text-neutral-50" />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  );
};

export default SelectField;
