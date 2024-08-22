import * as Dialog from '@radix-ui/react-dialog';
import { Theme } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';

const Content = forwardRef<
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

export default Content;
