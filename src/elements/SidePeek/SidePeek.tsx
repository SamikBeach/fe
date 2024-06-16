import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

import './side-peek.css';

interface Props {
  children: ReactNode;
}

export default function SidePeek({ children }: Props) {
  return children;
}

const SidePeekOverlay = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Dialog.Overlay>
>(function ({ children, className, ...props }, ref) {
  return (
    <Dialog.Overlay
      ref={ref}
      className={classNames('DialogContent', className)}
      {...props}
    >
      {children}
    </Dialog.Overlay>
  );
});

const SidePeekContent = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Dialog.Content>
>(function ({ className, children, ...props }, ref) {
  return (
    <Dialog.Content
      ref={ref}
      className={classNames('DialogContent', className)}
      {...props}
    >
      {children}
    </Dialog.Content>
  );
});

SidePeek.Overlay = SidePeekOverlay;
SidePeek.Content = SidePeekContent;
SidePeek.Root = Dialog.Root;
SidePeek.Trigger = Dialog.Trigger;
SidePeek.Portal = Dialog.Portal;
SidePeek.Close = Dialog.Close;
SidePeek.Title = Dialog.Title;
SidePeek.Description = Dialog.Description;
