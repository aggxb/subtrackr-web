import type { InputProps } from './InputComponent';
import InputComponent from './InputComponent';
import { formatToBRL, parseCurrencyToNumber } from '../utils/formatCurrency';

type CurrencyInputProps = Omit<InputProps, 'onChange'> & {
  value?: number | string;
  onChange: (value?: number | string) => void;
};

const CurrencyInput = ({
  value,
  onChange,
  label,
  prefix,
  ...props
}: CurrencyInputProps) => {
  return (
    <InputComponent
      label={label}
      prefix={prefix}
      value={formatToBRL(value)}
      onChange={({ target }) => {
        const parsedValue = parseCurrencyToNumber(target.value);
        onChange(parsedValue);
      }}
      {...props}
    />
  );
};

export default CurrencyInput;
