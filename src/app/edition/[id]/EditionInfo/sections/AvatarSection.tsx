import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addEditionLike,
  getEditionById,
  getEditionLikeCount,
  getMyEditionLikeExist,
  removeEditionLike,
} from '@apis/edition';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { LoginAlertDialog } from '@components/common/LoginAlertDialog';

export default function AvatarSection() {
  const params = useParams();
  const editionId = Number(params.id);

  const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

  const { data: edition } = useQuery({
    queryKey: ['edition', params.id],
    queryFn: () => getEditionById({ id: editionId }),
    select: response => response.data,
  });

  const { id, image_url, isbn, isbn13 } = edition ?? {
    id: 0,
    title: '',
    image_url: '',
    publication_date: '',
    publisher: '',
  };

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addEditionLike({
        editionId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchEditionLike();
      refetchEditionAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeEditionLike({
        editionId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchEditionLike();
      refetchEditionAllLikes();
    },
  });

  const { data: editionLike, refetch: refetchEditionLike } = useQuery({
    queryKey: ['edition-like', id],
    queryFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return getMyEditionLikeExist({
        editionId: id,
        userId: currentUser.id,
      });
    },
    enabled: currentUser != null,
    select: response => response.data,
  });

  const { data: editionAllLikes, refetch: refetchEditionAllLikes } = useQuery({
    queryKey: ['edition-like/count', id],
    queryFn: () => getEditionLikeCount({ editionId: id }),
    select: response => response.data.count,
  });

  return (
    <>
      <VStack position="relative" width="100%">
        <Link
          target="_blank"
          href={`https://www.aladin.co.kr/shop/wproduct.aspx?isbn=${isbn13 ?? isbn}`}
        >
          <img
            src={image_url ?? undefined}
            className={css({
              width: '140px',
              margin: '0 auto',
              cursor: 'pointer',
              _hover: {
                scale: 1.05,
              },
              transition: 'scale 0.2s ease-in-out',
            })}
          />
        </Link>
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
            {editionAllLikes}
          </Text>
          {editionLike?.isExist ? (
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
