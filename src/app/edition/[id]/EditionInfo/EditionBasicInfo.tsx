import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
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
import EditionBasicInfoSkeleton from './EditionBasicInfoSkeleton';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';

export default function EditionBasicInfo() {
  const params = useParams();
  const editionId = Number(params.id);

  const { data: edition, isLoading: isLoadingEdition } = useQuery({
    queryKey: ['edition', params.id],
    queryFn: () => getEditionById({ id: editionId }),
    select: response => response.data,
  });

  const {
    id,
    title,
    publication_date,
    publisher,
    image_url,
    author,
    original_works = [],
  } = edition ?? {
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

  const {
    data: editionLike,
    isLoading: isLoadingEditionLike,
    refetch: refetchEditionLike,
  } = useQuery({
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
    select: response => response.data,
  });

  const {
    data: editionAllLikes,
    isLoading: isLoadingEditionAllLikes,
    refetch: refetchEditionAllLikes,
  } = useQuery({
    queryKey: ['edition-like/count', id],
    queryFn: () => getEditionLikeCount({ editionId: id }),
    select: response => response.data.count,
  });

  const isLoading =
    isLoadingEdition || isLoadingEditionLike || isLoadingEditionAllLikes;

  if (isLoading) {
    return <EditionBasicInfoSkeleton />;
  }

  return (
    <VStack alignItems="start" gap="20px" width="100%">
      <VStack position="relative" width="100%">
        <Avatar
          radius="large"
          src={image_url ?? undefined}
          fallback={title[0]}
          size="9"
          className={css({
            width: '260px',
            height: '260px',
            margin: '0 auto',
          })}
        />
        {editionLike?.isExist ? (
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
          {title}
        </Text>
        <Text size="3">{publication_date}</Text>
        <Text size="3">{publisher}</Text>
        {author !== undefined && (
          <AuthorAvatar author={author} withName size="2" />
        )}

        <HStack>
          {original_works.map(originalWork => (
            <Link
              key={originalWork.id}
              href={`/original-work/${originalWork.id}`}
              onClick={e => e.stopPropagation()}
              className={css({
                cursor: 'pointer',
                color: 'gray.600',
              })}
            >
              <GiSecretBook
                className={css({
                  display: 'inline',
                  cursor: 'pointer',
                  color: 'gray.600',
                })}
                size="24px"
              />
              <Text
                className={css({
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {originalWork.title}
              </Text>
            </Link>
          ))}
        </HStack>

        <HStack gap="2px">
          <Text>{editionAllLikes}</Text>
          <HeartFilledIcon color="pink" />
        </HStack>
      </VStack>
    </VStack>
  );
}
