import {
  HStack,
  HstackProps,
  VStack,
  VstackProps,
  styled,
} from 'styled-system/jsx';
import { Avatar, DropdownMenu, IconButton, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';

import { format } from 'date-fns';
import { UserServerModel } from '@models/user';
import { CommentServerModel } from '@models/comment';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';

interface Props extends HstackProps {
  onClickLike: () => void;
  onClickToggleShowSubComments?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  likeCount: number;
  subCommentCount?: number;
  myLikeExist: boolean;
  user: UserServerModel;
  comment: CommentServerModel;
  isShowSubComments?: boolean;
  width: VstackProps['width'];
}

export default function CommentItem({
  onClickLike,
  onClickToggleShowSubComments,
  onDelete,
  onEdit,
  likeCount,
  subCommentCount,
  myLikeExist,
  user,
  comment,
  isShowSubComments,
  width,
  ...props
}: Props) {
  const currentUser = useAtomValue(currentUserAtom);

  const isMyComment = currentUser?.id === user.id;

  return (
    <HStack alignItems="start" width="100%" justify="end" {...props}>
      <Avatar fallback="B" radius="full" size="2" mt="4px" />
      <VStack gap="4px" alignItems="start" width={width}>
        <CommentBox>
          <HStack justify="space-between">
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
            {isMyComment && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton
                    size="1"
                    variant="ghost"
                    className={css({ cursor: 'pointer' })}
                  >
                    <DotsHorizontalIcon color="gray" />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    className={css({ cursor: 'pointer' })}
                    onSelect={onEdit}
                  >
                    Edit
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className={css({ cursor: 'pointer' })}
                    onSelect={onDelete}
                  >
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </HStack>
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
              onClick={onClickToggleShowSubComments}
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
    whiteSpace: 'pre-wrap',
  },
});