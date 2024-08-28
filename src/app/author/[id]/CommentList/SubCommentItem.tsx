import { HStack, VStack, styled } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { CommentServerModel } from '@models/comment';
import { format } from 'date-fns';

interface Props {
  comment: CommentServerModel;
}

export default function SubCommentItem({ comment: commentProps }: Props) {
  const { id, comment, user, created_at } = commentProps;

  return (
    <HStack alignItems="start" ml="60px" width="664px">
      <Avatar fallback="B" radius="full" size="2" mt="4px" />
      <VStack gap="4px" alignItems="start" width="100%">
        <CommentBox>
          <Text weight="medium" className={css({ display: 'block' })}>
            {user.name}{' '}
            <span
              className={css({
                fontSize: '12px',
                fontWeight: 'normal',
                color: 'gray',
              })}
            >
              {format(created_at, 'd MMMM y HH:mm')}
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
              className={css({ cursor: 'pointer', userSelect: 'none' })}
            >
              Like
            </Text>
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer', userSelect: 'none' })}
            >
              Reply
            </Text>
          </HStack>
          <Text
            weight="medium"
            color="gray"
            size="1"
            className={css({ cursor: 'pointer' })}
            mr="8px"
          >
            334 likes
          </Text>
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
