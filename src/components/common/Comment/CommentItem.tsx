import {
  HStack,
  HstackProps,
  VStack,
  VstackProps,
  styled,
} from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';

import { format } from 'date-fns';
import { UserServerModel } from '@models/user';
import { CommentServerModel } from '@models/comment';

interface Props extends HstackProps {
  onClickReply: () => void;
  onClickLike: () => void;
  onClickToggleShowSubComments?: () => void;
  likeCount: number;
  subCommentCount?: number;
  myLikeExist: boolean;
  user: UserServerModel;
  comment: CommentServerModel;
  isShowSubComments?: boolean;
  width: VstackProps['width'];
}

export default function CommentItem({
  onClickReply,
  onClickLike,
  onClickToggleShowSubComments,
  likeCount,
  subCommentCount,
  myLikeExist,
  user,
  comment,
  isShowSubComments,
  width,
  ...props
}: Props) {
  return (
    <HStack alignItems="start" width="100%" justify="end" {...props}>
      <Avatar fallback="B" radius="full" size="2" mt="4px" />
      <VStack gap="4px" alignItems="start" width={width}>
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
              {format(comment.created_at, 'd MMMM y HH:mm')}
            </span>
          </Text>
          {comment.comment}
        </CommentBox>
        <HStack justify="space-between" width="100%">
          <HStack ml="8px">
            <Text
              size="1"
              className={css({
                cursor: 'pointer',
                fontWeight: myLikeExist ? 'bold' : 'medium',
                color: myLikeExist ? 'black' : 'gray',
                userSelect: 'none',
              })}
              onClick={onClickLike}
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
              })}
              onClick={onClickReply}
            >
              Reply
            </Text>
          </HStack>
          <HStack mr="8px">
            <Text weight="medium" color="gray" size="1">
              {likeCount} likes
            </Text>
            {subCommentCount !== undefined && subCommentCount > 0 && (
              <Text
                weight="medium"
                color="gray"
                size="1"
                className={css({ cursor: 'pointer', userSelect: 'none' })}
                onClick={onClickToggleShowSubComments}
              >
                {isShowSubComments
                  ? 'Hide replies'
                  : `View replies (${subCommentCount})`}
              </Text>
            )}
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
