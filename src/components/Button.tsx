import { Button as RadixButton, ButtonProps } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';

interface Props extends ButtonProps {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }: Props, ref) => {
    return (
      <RadixButton ref={ref} {...props}>
        {children}
      </RadixButton>
    );
  }
);

export default Button;
