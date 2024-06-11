import { Button as RadixButton } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<typeof RadixButton> {}

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
