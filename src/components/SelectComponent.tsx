import React from 'react';
import { Label, ListBox, Select } from '@heroui/react';
import type { OptionProps } from '../types/types';

type SelectProps = React.ComponentProps<'select'> & {
  options: OptionProps[];
  label?: string;
  value?: string | number | null;
  onChange?: (value: string | number) => void;
};

const SelectComponent = ({
  label,
  options,
  value,
  onChange,
  className,
}: SelectProps) => {
  const handleChange = (selectedValue: React.Key | null) => {
    if (selectedValue === null) return;

    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );

    if (selectedOption && onChange) {
      onChange(selectedValue as string);
    }
  };
  return (
    <Select aria-label={label || 'Opções de seleção'} value={value} onChange={handleChange} className="min-w-40">
      {label && <Label className="font-medium text-neutral-500">{label}</Label>}
      <Select.Trigger
        className={`bg-neutral-900 border border-neutral-800  *:text-neutral-500 ${className}`}
      >
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="bg-neutral-900">
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.id}
              id={option.value}
              textValue={option.label}
              className="hover:bg-neutral-800"
            >
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectComponent;
