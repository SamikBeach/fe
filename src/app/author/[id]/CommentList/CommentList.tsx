import { VStack } from 'styled-system/jsx';
import CommentItem from './CommentItem';
import { css } from 'styled-system/css';
import { ScrollArea } from '@radix-ui/themes';

export default function CommentList() {
  return (
    <ScrollArea
      scrollbars="vertical"
      className={css({
        height: 'calc(100vh - 64px)',
        flex: 3,
      })}
    >
      <VStack
        alignItems="start"
        padding="40px"
        fontSize="14px"
        gap="20px"
        width="800px"
      >
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </VStack>
    </ScrollArea>
  );
}
