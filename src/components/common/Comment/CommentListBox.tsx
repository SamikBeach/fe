import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { ScrollArea } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CommentListBox({ children }: Props) {
  return (
    <ScrollArea
      scrollbars="vertical"
      className={css({ height: 'calc(100vh - 168px)' })}
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
}
