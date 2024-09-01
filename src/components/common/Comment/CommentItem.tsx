import {
  HStack,
  HstackProps,
  VStack,
  VstackProps,
  styled,
} from 'styled-system/jsx';
import {
  Avatar,
  Button,
  DropdownMenu,
  IconButton,
  Text,
} from '@radix-ui/themes';
import { css } from 'styled-system/css';

import { formatDistanceToNow } from 'date-fns';
import { UserServerModel } from '@models/user';
import { CommentServerModel } from '@models/comment';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import { useState } from 'react';
import { DeleteConfirmDialog } from '../DeleteConfirmDialog';
import { motion } from 'framer-motion';

const MAX_COMMENT_LENGTH = 120;

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

  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState(false);

  const [isSeeMoreButtonShown, setIsSeeMoreButtonShown] = useState(
    comment.comment.length > MAX_COMMENT_LENGTH
  );

  const isMyComment = currentUser?.id === user.id;

  const createdAt = formatDistanceToNow(comment.created_at, {
    addSuffix: true,
  }).replace('about ', '');

  return (
    <motion.div
      initial={{
        // 처음 마운트 될 때 상태,
        // 마운트시 애니메이션을 원하지 않다면 initial = {false}
        opacity: 0,
      }}
      animate={{
        // 애니메이션이 끝났을 때의 상태
        opacity: 1,
      }}
      transition={{
        // animate state까지 어떻게 변할지 정하는 옵션
        // 여러 transition type을 정의 할 수 있다.
        ease: 'easeIn',
        duration: 0.2,
      }}
    >
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
                  {createdAt}
                </span>
              </Text>
              {isMyComment && (
                <>
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
                        onSelect={() => setIsOpenDeleteConfirmDialog(true)}
                      >
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                  <DeleteConfirmDialog
                    onDelete={onDelete}
                    open={isOpenDeleteConfirmDialog}
                    onOpenChange={setIsOpenDeleteConfirmDialog}
                  />
                </>
              )}
            </HStack>
            <Text>
              {isSeeMoreButtonShown
                ? `${comment.comment.slice(0, MAX_COMMENT_LENGTH)}...`
                : comment.comment}
            </Text>
            {isSeeMoreButtonShown && (
              <Button
                variant="ghost"
                size="1"
                onClick={() => setIsSeeMoreButtonShown(false)}
                className={css({
                  color: 'black',
                  fontWeight: 'medium',
                  pt: '6px',
                  pl: '16px',

                  _hover: {
                    bgColor: 'transparent',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  },
                })}
              >
                See more
              </Button>
            )}
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
    </motion.div>
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
