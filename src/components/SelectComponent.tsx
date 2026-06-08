import React from 'react';
import { Label, ListBox, Select } from '@heroui/react';

type SelectProps<T> = Omit<React.ComponentProps<'select'>, 'onChange' | 'value'> & {
  options: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  label?: string;
  value?: string | number | null;
  onChange?: (value: string | number) => void;
}

const SelectComponent = <T,>({
  label,
  labelKey,
  valueKey,
  options,
  value,
  onChange,
  className,
}: SelectProps<T>) => {
  const handleChange = (selectedValue: React.Key | null) => {
    if (selectedValue === null) return;

    const selectedOption = options.find(
      (option) => String(option[valueKey]) === selectedValue,
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
              key={String(option[valueKey])}
              id={String(option[valueKey])}
              textValue={String(option[labelKey])}
              className="hover:bg-neutral-800"
            >
              {String(option[labelKey])}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectComponent;
