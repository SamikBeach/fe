import { forwardRef } from 'react';
import { ButtonProps, Button as RadixButton, Spinner } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import classNames from 'classnames';

interface Props extends ButtonProps {}

const Button = forwardRef<HTMLButtonElement, Props>(function (
  { className, loading, children, ...props },
  ref
) {
  return (
    <RadixButton
      ref={ref}
      className={classNames(
        css({ cursor: props.disabled ? undefined : 'pointer', gap: '4px' }),
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          {children}
          <Spinner />
        </>
      ) : (
        children
      )}
    </RadixButton>
  );
});

export default Button;
