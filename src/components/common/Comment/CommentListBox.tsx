import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { ScrollArea, ScrollAreaProps } from '@radix-ui/themes';
import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface Props extends ScrollAreaProps {
  children: ReactNode;
}

const CommentListBox = forwardRef<HTMLDivElement, Props>(function (
  { children, ...props },
  ref
) {
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
        // NOTE: scroll margin
        pb="120px"
      >
        {children}
      </VStack>
    </ScrollArea>
  );
});

export default CommentListBox;
