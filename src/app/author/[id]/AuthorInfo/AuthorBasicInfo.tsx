import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addAuthorLike,
  getAuthorById,
  getAuthorLikeCount,
  getMyAuthorLikeExist,
  removeAuthorLike,
} from '@apis/author';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import { useParams } from 'next/navigation';
import AuthorBasicInfoSkeleton from './AuthorBasicInfoSkeleton';
import { useLocale } from 'next-intl';

export default function AuthorInfo() {
  const locale = useLocale();

  const params = useParams();
  const authorId = Number(params.id);

  const { data: author, isLoading: isLoadingAuthor } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: authorId }),
    select: response => response.data,
  });

  const {
    id,
    name,
    name_in_kor,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
  } = author ?? {
    id: authorId,
    name: '',
    name_in_kor: '',
    image_url: '',
    born_date: '',
    died_date: '',
    born_date_is_bc: 0,
    died_date_is_bc: 0,
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
    select: response => response.data,
  });

  const { data: authorAllLikes, refetch: refetchAuthorAllLikes } = useQuery({
    queryKey: ['author-like/count', id],
    queryFn: () => getAuthorLikeCount({ authorId: id }),
    select: response => response.data.count,
  });

  if (isLoadingAuthor) {
    return <AuthorBasicInfoSkeleton />;
  }

  return (
    <VStack alignItems="start" gap="20px" width="100%">
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
              onClick={() => addLike()}
            />
          )}
        </HStack>
      </VStack>
      <VStack alignItems="start" gap="2px">
        <Text size="6" weight="bold">
          {name_in_kor}
        </Text>
        <Text size="3">{name}</Text>
        <Text size="3" color="gray">
          {getBornAndDiedDateText({
            bornDate: born_date,
            diedDate: died_date,
            bornDateIsBc: born_date_is_bc === 1,
            diedDateIsBc: died_date_is_bc === 1,
            locale,
          })}
        </Text>
      </VStack>
    </VStack>
  );
}
