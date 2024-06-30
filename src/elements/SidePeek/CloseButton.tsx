import { Cross1Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { css } from 'styled-system/css';

const CloseButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof IconButton>
>(function ({ className, ...props }, ref) {
  return (
    <Dialog.Close asChild>
      <IconButton
        ref={ref}
        variant="soft"
        color="gray"
        size="1"
        className={classNames(
          css({
            cursor: 'pointer',
            position: 'absolute',
            fontWeight: 'bold',
            fontSize: '30px',
            top: '16px',
            right: '16px',
            rounded: 'full',
          }),
          className
        )}
        {...props}
      >
        <Cross1Icon />
      </IconButton>
    </Dialog.Close>
  );
});

export default CloseButton;
