import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addOriginalWorkLike,
  getOriginalWorkById,
  getOriginalWorkLikeCount,
  getMyOriginalWorkLikeExist,
  removeOriginalWorkLike,
} from '@apis/original-work';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import { useParams } from 'next/navigation';
import { GiSecretBook } from 'react-icons/gi';
import { useState } from 'react';
import { LoginAlertDialog } from '@components/common/LoginAlertDialog';

export default function AvatarSection() {
  const params = useParams();
  const originalWorkId = Number(params.id);

  const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

  const { data: originalWork } = useQuery({
    queryKey: ['original-work', params.id],
    queryFn: () => getOriginalWorkById({ id: originalWorkId }),
    select: response => response.data,
  });

  const { id } = originalWork ?? {
    id: 0,
  };

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addOriginalWorkLike({
        originalWorkId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchOriginalWorkLike();
      refetchOriginalWorkAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeOriginalWorkLike({
        originalWorkId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchOriginalWorkLike();
      refetchOriginalWorkAllLikes();
    },
  });

  const { data: originalWorkLike, refetch: refetchOriginalWorkLike } = useQuery(
    {
      queryKey: ['original-work-like', id],
      queryFn: () => {
        if (currentUser === null) {
          throw new Error('User is not logged in');
        }

        return getMyOriginalWorkLikeExist({
          originalWorkId: id,
          userId: currentUser.id,
        });
      },
      enabled: currentUser != null,
      select: response => response.data,
    }
  );

  const { data: originalWorkAllLikes, refetch: refetchOriginalWorkAllLikes } =
    useQuery({
      queryKey: ['original-work-like/count', id],
      queryFn: () => getOriginalWorkLikeCount({ originalWorkId: id }),
      select: response => response.data.count,
    });

  return (
    <>
      <VStack position="relative" width="100%">
        <Avatar
          radius="full"
          fallback={
            <GiSecretBook
              className={css({
                color: 'gray.500',
              })}
              size="40px"
            />
          }
          size="9"
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
            {originalWorkAllLikes}
          </Text>
          {originalWorkLike?.isExist ? (
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
