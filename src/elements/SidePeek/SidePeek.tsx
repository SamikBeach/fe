import { Dialog } from '@radix-ui/themes';
import { ComponentProps, ReactNode, forwardRef } from 'react';
import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

interface Props {
  children: ReactNode;
}

export default function SidePeek({ children }: Props) {
  return children;
}

function SidePeekRoot({
  children,
  ...props
}: ComponentProps<typeof Dialog.Root>) {
  return <StyledDialogRoot {...props}>{children}</StyledDialogRoot>;
}

const SidePeekContent = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Dialog.Content>
>(function (props, ref) {
  return (
    <Dialog.Content
      ref={ref}
      className={css({ marginRight: '10px' })}
      {...props}
    >
      {props.children}
    </Dialog.Content>
  );
});

const StyledDialogRoot = styled(Dialog.Root, {
  base: {
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
    },
  },
});

SidePeek.Root = SidePeekRoot;
SidePeek.Trigger = Dialog.Trigger;
SidePeek.Content = SidePeekContent;
SidePeek.Close = Dialog.Close;
SidePeek.Title = Dialog.Title;
SidePeek.Description = Dialog.Description;
