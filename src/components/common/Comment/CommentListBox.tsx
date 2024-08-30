import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { ScrollArea } from '@radix-ui/themes';
import { ReactNode, forwardRef } from 'react';

interface Props {
  children: ReactNode;
}

const CommentListBox = forwardRef<HTMLDivElement, Props>(function (
  { children },
  ref
) {
  return (
    <ScrollArea
      ref={ref}
      scrollbars="vertical"
      className={css({ height: 'calc(100vh - 170px)' })}
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
