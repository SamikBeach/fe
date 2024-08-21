import { VStack } from 'styled-system/jsx';
import CommentItem from './CommentItem';

export default function CommentList() {
  return (
    <VStack
      width="100%"
      alignItems="start"
      padding="40px"
      fontSize="14px"
      gap="20px"
    >
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </VStack>
  );
}
