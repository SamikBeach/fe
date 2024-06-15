import { forwardRef } from 'react';
import { ButtonProps, Button as RadixButton } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import classNames from 'classnames';

interface Props extends ButtonProps {}

const Button = forwardRef<HTMLButtonElement, Props>(function (
  { className, ...props },
  ref
) {
  return (
    <RadixButton
      ref={ref}
      className={classNames(css({ cursor: 'pointer' }), className)}
      {...props}
    />
  );
});

export default Button;
