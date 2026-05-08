import { InputGroup, Label, TextField } from '@heroui/react';

export type InputProps = React.ComponentProps<'input'> & {
  label?: string;
  prefix?: string;
  isInvalid?: boolean;
};

const InputComponent = ({
  id,
  label,
  prefix,
  isInvalid,
  "aria-label": ariaLabel,
  ...props
}: InputProps) => {
  return (
    <TextField isInvalid={isInvalid} aria-label={ariaLabel || label}>
      {label && (
        <Label htmlFor={id} className="font-medium text-neutral-500">
          {label}
        </Label>
      )}
      <InputGroup
        className={`bg-transparent border *:text-neutral-400 ${
          isInvalid
            ? 'border-red-500 ring-red-500'
            : 'border-neutral-800 ring-neutral-700'
        }`}
      >
        {prefix && <InputGroup.Prefix>{prefix}</InputGroup.Prefix>}
        <InputGroup.Input
          id={id}
          {...props}
          className="placeholder:text-neutral-600"
        />
      </InputGroup>
    </TextField>
  );
};

export default InputComponent;
