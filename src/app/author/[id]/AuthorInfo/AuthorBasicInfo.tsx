import { AuthorServerModel } from '@models/author';
import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addAuthorLike,
  getAuthorLikeCount,
  getMyAuthorLikeExist,
  removeAuthorLike,
} from '@apis/author';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  const {
    id,
    name,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
  } = author;

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
        {authorLike?.isExist ? (
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
          {name}
        </Text>
        <Text size="3">
          {getBornAndDiedDateText({
            bornDate: born_date,
            diedDate: died_date,
            bornDateIsBc: born_date_is_bc === 1,
            diedDateIsBc: died_date_is_bc === 1,
          })}
        </Text>
        <HStack gap="2px">
          <Text>{authorAllLikes}</Text>
          <HeartFilledIcon color="pink" />
        </HStack>
      </VStack>
    </VStack>
  );
}
