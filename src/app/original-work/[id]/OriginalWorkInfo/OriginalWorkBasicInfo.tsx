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
import OriginalWorkBasicInfoSkeleton from './OriginalWorkBasicInfoSkeleton';
import { getPublicationDateText } from '@utils/original-work';
import { useLocale } from 'next-intl';

export default function OriginalWorkInfo() {
  const locale = useLocale();

  const params = useParams();
  const originalWorkId = Number(params.id);

  const { data: originalWork, isLoading: isLoadingOriginalWork } = useQuery({
    queryKey: ['original-work', params.id],
    queryFn: () => getOriginalWorkById({ id: originalWorkId }),
    select: response => response.data,
  });

  const { id, title, title_in_kor, title_in_eng } = originalWork ?? {
    id: 0,
    title: '',
    title_in_eng: '',
    publication_date: '',
    publication_date_is_bc: 0,
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

  const {
    data: originalWorkLike,
    isLoading: isLoadingOriginalWorkLike,
    refetch: refetchOriginalWorkLike,
  } = useQuery({
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
    select: response => response.data,
  });

  const {
    data: originalWorkAllLikes,
    isLoading: isLoadingOriginalWorkAllLikes,
    refetch: refetchOriginalWorkAllLikes,
  } = useQuery({
    queryKey: ['original-work-like/count', id],
    queryFn: () => getOriginalWorkLikeCount({ originalWorkId: id }),
    select: response => response.data.count,
  });

  const isLoading =
    isLoadingOriginalWork ||
    isLoadingOriginalWorkLike ||
    isLoadingOriginalWorkAllLikes;

  if (isLoading) {
    return <OriginalWorkBasicInfoSkeleton />;
  }

  return (
    <VStack alignItems="start" gap="20px" width="100%">
      <VStack position="relative" width="100%">
        <Avatar
          radius="large"
          // src={image_url ?? undefined}
          fallback={title[0]}
          size="9"
          className={css({
            width: '260px',
            height: '260px',
            margin: '0 auto',
          })}
        />
        {originalWorkLike?.isExist ? (
          <HeartFilledIcon
            color="pink"
            width="40px"
            height="40px"
            className={css({
              zIndex: 2,
              position: 'absolute',
              right: '70px',
              bottom: '30px',
            })}
            cursor="pointer"
            onClick={() => removeLike()}
          />
        ) : (
          <HeartIcon
            color="pink"
            width="40px"
            height="40px"
            className={css({
              zIndex: 2,
              position: 'absolute',
              right: '70px',
              bottom: '30px',
            })}
            cursor="pointer"
            onClick={() => addLike()}
          />
        )}
      </VStack>
      <VStack alignItems="start" gap="2px">
        <Text size="6" weight="bold">
          {title_in_kor}
        </Text>
        <Text size="5" color="gray">
          {title}
        </Text>
        <Text size="5" color="gray">
          {title_in_eng}
        </Text>
        {originalWork !== undefined && (
          <Text size="3">
            {getPublicationDateText({ originalWork, locale })}
          </Text>
        )}
        <HStack gap="2px">
          <Text>{originalWorkAllLikes}</Text>
          <HeartFilledIcon color="pink" />
        </HStack>
      </VStack>
    </VStack>
  );
}
