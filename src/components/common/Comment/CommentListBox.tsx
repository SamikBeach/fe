import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { ScrollArea, ScrollAreaProps } from '@radix-ui/themes';
import { ReactNode, forwardRef } from 'react';

interface Props extends ScrollAreaProps {
  children: ReactNode;
  isMobile?: boolean;
}

const CommentListBox = forwardRef<HTMLDivElement, Props>(function (
  { children, isMobile, ...props },
  ref
) {
  if (isMobile) {
    return (
      <VStack
        alignItems="start"
        fontSize="14px"
        gap="20px"
        width="100%"
        padding={isMobile ? '10px' : '40px'}
      >
        {children}
      </VStack>
    );
  }

  return (
    <ScrollArea
      ref={ref}
      scrollbars="vertical"
      className={css({ height: 'calc(100vh - 170px)' })}
      {...props}
    >
      <VStack
        alignItems="start"
        fontSize="14px"
        gap="20px"
        width="800px"
        padding="40px"
      >
        {children}
      </VStack>
    </ScrollArea>
  );
});

export default CommentListBox;
