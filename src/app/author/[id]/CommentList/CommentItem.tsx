import { HStack, VStack, styled } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { CommentServerModel } from '@models/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addAuthorCommentLike,
  getAllAuthorComments,
  getAuthorCommentLikeCount,
  getMyAuthorCommentLikeExist,
  removeAuthorCommentLike,
} from '@apis/author';
import { currentUserAtom } from '@atoms/user';
import { useAtomValue } from 'jotai';
import { format } from 'date-fns';
import { ReplyCommentEditor } from './ReplyCommentEditor';
import { useState } from 'react';

interface Props {
  comment: CommentServerModel;
}

export default function CommentItem({ comment: commentProps }: Props) {
  const { id, comment, user, created_at } = commentProps;

  const [showReplyEditor, setShowReplyEditor] = useState(false);

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
    <VStack width="100%">
      <HStack alignItems="start" width="100%">
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
                  fontWeight: authorCommentLike?.isExist ? 'bold' : 'medium',
                  color: authorCommentLike?.isExist ? 'black' : 'gray',
                  userSelect: 'none',
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
                className={css({
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontWeight: showReplyEditor ? 'bold' : 'medium',
                  color: showReplyEditor ? 'black' : 'gray',
                })}
                onClick={() => setShowReplyEditor(prev => !prev)}
              >
                Reply
              </Text>
            </HStack>
            <HStack mr="8px">
              <Text weight="medium" color="gray" size="1">
                {authorCommentAllLikes} likes
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
      {showReplyEditor && <ReplyCommentEditor onSubmit={() => {}} />}
    </VStack>
  );
}

const CommentBox = styled('div', {
  base: {
    width: '678px',
    padding: '10px',
    bgColor: 'gray.100',
    borderRadius: '6px',
  },
});
