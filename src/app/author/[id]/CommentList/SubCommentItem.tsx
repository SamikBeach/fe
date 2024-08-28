import { HStack, VStack, styled } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { CommentServerModel } from '@models/comment';
import { format } from 'date-fns';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  addAuthorCommentLike,
  getAuthorCommentLikeCount,
  getMyAuthorCommentLikeExist,
  removeAuthorCommentLike,
} from '@apis/author';
import { useMutation, useQuery } from '@tanstack/react-query';

interface Props {
  comment: CommentServerModel;
}

export default function SubCommentItem({ comment: commentProps }: Props) {
  const { id, comment, user, created_at } = commentProps;

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addAuthorCommentLike({
        authorCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchAuthorCommentLike();
      refetchAuthorCommentAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeAuthorCommentLike({
        authorCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchAuthorCommentLike();
      refetchAuthorCommentAllLikes();
    },
  });

  const { data: authorCommentLike, refetch: refetchAuthorCommentLike } =
    useQuery({
      queryKey: ['author-comment-like', id],
      queryFn: () =>
        getMyAuthorCommentLikeExist({ authorCommentId: id, userId: 1 }),
      select: response => response.data,
    });

  const {
    data: authorCommentAllLikes = 0,
    refetch: refetchAuthorCommentAllLikes,
  } = useQuery({
    queryKey: ['author-comment-like/count', id],
    queryFn: () => getAuthorCommentLikeCount({ authorCommentId: id }),
    select: response => response.data.count,
  });

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
              size="1"
              className={css({
                cursor: 'pointer',
                userSelect: 'none',
                fontWeight: authorCommentLike?.isExist ? 'bold' : 'medium',
                color: authorCommentLike?.isExist ? 'black' : 'gray',
              })}
              onClick={() =>
                authorCommentLike?.isExist ? removeLike() : addLike()
              }
            >
              Like
            </Text>
            <Text
              weight="medium"
              color="gray"
              size="1"
              className={css({ cursor: 'pointer', userSelect: 'none' })}
              onClick={() => {}}
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
            {authorCommentAllLikes} likes
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
