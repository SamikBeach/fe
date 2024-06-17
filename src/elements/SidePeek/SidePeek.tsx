import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

import './side-peek.css';
import { IconButton, Theme } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import { css } from 'styled-system/css';

interface Props {
  children: ReactNode;
}

export default function SidePeek({ children }: Props) {
  return children;
}

const SidePeekOverlay = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Dialog.Overlay>
>(function ({ className, ...props }, ref) {
  return (
    <Dialog.Overlay
      ref={ref}
      className={classNames('DialogOverlay', className)}
      {...props}
    />
  );
});

const SidePeekContent = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Dialog.Content>
>(function ({ className, children, ...props }, ref) {
  return (
    <Theme asChild>
      <Dialog.Content
        ref={ref}
        className={classNames('DialogContent', className)}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Theme>
  );
});

const SidePeekCloseButton = forwardRef<
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

SidePeek.Overlay = SidePeekOverlay;
SidePeek.Content = SidePeekContent;
SidePeek.CloseButton = SidePeekCloseButton;
SidePeek.Root = Dialog.Root;
SidePeek.Trigger = Dialog.Trigger;
SidePeek.Portal = Dialog.Portal;
SidePeek.Close = Dialog.Close;
SidePeek.Title = Dialog.Title;
SidePeek.Description = Dialog.Description;
