import { type LucideIcon } from 'lucide-react';
import React from 'react';
import { Button } from '@heroui/react';

type ButtonProps = React.ComponentProps<'button'> & {
  icon?: LucideIcon;
  bgColor?: string;
  textColor?: string;
  handleClick?: () => void;
};

const ButtonComponent = ({
  icon: Icon,
  children,
  bgColor,
  textColor,
  handleClick,
  form,
  type = 'button',
  'aria-label': ariaLabel,
  disabled,
}: ButtonProps) => {
  return (
    <Button
      aria-label={ariaLabel}
      variant="primary"
      form={form}
      type={type}
      onClick={handleClick}
      className={`${textColor ? textColor : 'text-neutral-950'} ${
        bgColor ? bgColor : 'bg-neutral-50'
      } max-sm:px-2.5 max-sm:text-xs`}
      isDisabled={disabled}
    >
      {Icon && <Icon size={16} />}
      {children}
    </Button>
  );
};

export default ButtonComponent;
