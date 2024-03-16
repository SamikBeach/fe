import { Button as RadixButton } from '@radix-ui/themes';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof RadixButton> {}

function Button({ children, ...props }: Props) {
  return <RadixButton {...props}>{children}</RadixButton>;
}

export default Button;
