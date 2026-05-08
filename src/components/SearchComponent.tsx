import React from 'react';
import { SearchField } from '@heroui/react';

type SearchProps = React.ComponentProps<'input'> & {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchComponent = ({ name, placeholder, "aria-label": ariaLabel, ...props }: SearchProps) => {
  return (
    <SearchField name={name} aria-label={ariaLabel}>
      <SearchField.Group className="bg-neutral-900 text-neutral-400 border border-neutral-800 ring-neutral-700">
        <SearchField.SearchIcon className="text-neutral-400" />
        <SearchField.Input
          placeholder={placeholder}
          {...props}
        />
      </SearchField.Group>
    </SearchField>
  );
};

export default SearchComponent;
