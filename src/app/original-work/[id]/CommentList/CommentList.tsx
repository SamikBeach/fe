import { VStack } from 'styled-system/jsx';
import CommentItem from './CommentItem';
import { css } from 'styled-system/css';
import { ScrollArea, Text } from '@radix-ui/themes';
import SubCommentItem from './SubCommentItem';

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
        <Text size="3" weight="medium">
          Comment(40)
        </Text>
        <VStack gap="10px">
          <CommentItem />
          <SubCommentItem />
        </VStack>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </VStack>
    </ScrollArea>
  );
}
