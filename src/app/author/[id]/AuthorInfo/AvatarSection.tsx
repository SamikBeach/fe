import {
  addAuthorLike,
  getAuthorById,
  getAuthorLikeCount,
  getMyAuthorLikeExist,
  removeAuthorLike,
} from '@apis/author';
import { currentUserAtom } from '@atoms/user';
import { LoginAlertDialog } from '@components/common/LoginAlertDialog';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function AvatarSection() {
  const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

  const params = useParams();
  const authorId = Number(params.id);

  const { data: author } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: authorId }),
    select: response => response.data,
  });

  const { id, name, image_url } = author ?? {
    id: authorId,
    name: '',
    image_url: '',
  };

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addAuthorLike({ authorId: id, userId: currentUser.id });
    },
    onSuccess: () => {
      refetchAuthorLike();
      refetchAuthorAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeAuthorLike({ authorId: id, userId: currentUser.id });
    },
    onSuccess: () => {
      refetchAuthorLike();
      refetchAuthorAllLikes();
    },
  });

  const { data: authorLike, refetch: refetchAuthorLike } = useQuery({
    queryKey: ['author-like', id],
    queryFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return getMyAuthorLikeExist({ authorId: id, userId: currentUser.id });
    },
    enabled: currentUser != null,
    select: response => response.data,
  });

  const { data: authorAllLikes, refetch: refetchAuthorAllLikes } = useQuery({
    queryKey: ['author-like/count', id],
    queryFn: () => getAuthorLikeCount({ authorId: id }),
    select: response => response.data.count,
  });

  return (
    <>
      <VStack position="relative" width="100%">
        <Avatar
          radius="full"
          src={image_url ?? undefined}
          fallback={name}
          size="9"
          className={css({
            width: '260px',
            height: '260px',
            margin: '0 auto',
          })}
        />
        <HStack
          className={css({
            zIndex: 2,
            position: 'absolute',
            right: '20px',
            bottom: '0px',
          })}
          gap="2px"
        >
          <Text size="5" color="gray" className={css({ userSelect: 'none' })}>
            {authorAllLikes}
          </Text>
          {authorLike?.isExist ? (
            <HeartFilledIcon
              color="gray"
              width="22px"
              height="22px"
              cursor="pointer"
              onClick={() => removeLike()}
            />
          ) : (
            <HeartIcon
              color="gray"
              width="22px"
              height="22px"
              cursor="pointer"
              onClick={() => {
                if (currentUser === null) {
                  setOpenLoginAlertDialog(true);

                  return;
                }

                addLike();
              }}
            />
          )}
        </HStack>
      </VStack>
      <LoginAlertDialog
        open={openLoginAlertDialog}
        onOpenChange={setOpenLoginAlertDialog}
      />
    </>
  );
}
