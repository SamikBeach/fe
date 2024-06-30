import { ComponentProps, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';

const Overlay = forwardRef<
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

export default Overlay;
