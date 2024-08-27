import { HStack, VStack, styled } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { Comment } from '@models/comment';

interface Props {
  comment: Comment;
}

export default function CommentItem({ comment: commentProps }: Props) {
  const { comment, like_count } = commentProps;

  return (
    <HStack alignItems="start" width="100%">
      <Avatar fallback="B" radius="full" size="2" mt="4px" />
      <VStack gap="4px" alignItems="start" width="100%">
        <CommentBox>
          <Text weight="medium" className={css({ display: 'block' })}>
            Bonggeun Jeong{' '}
            <span
              className={css({
                fontSize: '12px',
                fontWeight: 'normal',
                color: 'gray',
              })}
            >
              2 months ago
            </span>
          </Text>
          {comment}
        </CommentBox>
        <HStack justify="space-between" width="100%">
          <HStack ml="8px">
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer' })}
            >
              Like
            </Text>
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer' })}
            >
              Comment
            </Text>
          </HStack>
          <HStack mr="8px">
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer' })}
            >
              {like_count} likes
            </Text>
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer' })}
            >
              View replies (3)
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

const CommentBox = styled('div', {
  base: {
    width: '100%',
    padding: '10px',
    bgColor: 'gray.100',
    borderRadius: '6px',
  },
});
