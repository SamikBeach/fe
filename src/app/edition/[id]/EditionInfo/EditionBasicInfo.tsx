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
import EditionBasicInfoSkeleton from './EditionBasicInfoSkeleton';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { format } from 'date-fns';
import { useLocale } from 'next-intl';
import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';

export default function EditionBasicInfo() {
  const locale = useLocale();

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
    isbn,
    isbn13,
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
          <Text size="5" color="gray">
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
              onClick={() => addLike()}
            />
          )}
        </HStack>
      </VStack>
      <VStack alignItems="start" gap="8px">
        <VStack alignItems="start" gap="0px">
          <Text size="6" weight="bold">
            {title}
          </Text>
          <Text size="3" color="gray">
            {publisher}
          </Text>
          <Text size="3" color="gray">
            {format(
              new Date(publication_date),
              locale === 'ko' ? 'yyyy년 M월 d일' : 'yyyy-MM-dd'
            )}
          </Text>
          {author !== undefined && (
            <AuthorAvatar
              author={author}
              withName
              size="2"
              className={css({
                mt: '4px',
              })}
              textProps={{ size: '2', color: 'gray', weight: 'regular' }}
            />
          )}
        </VStack>

        <HStack flexWrap="wrap" gap="4px">
          {original_works.map(originalWork => (
            <OriginalWorkHoverCard.Root key={originalWork.id}>
              <OriginalWorkHoverCard.Trigger>
                <Link
                  href={`/original-work/${originalWork.id}`}
                  onClick={e => e.stopPropagation()}
                  className={css({
                    cursor: 'pointer',
                  })}
                >
                  <GiSecretBook
                    color="gray"
                    className={css({
                      display: 'inline',
                      cursor: 'pointer',
                      color: 'gray.500',
                    })}
                    size="24px"
                  />
                  <Text
                    size="2"
                    color="gray"
                    className={css({
                      _hover: {
                        textDecoration: 'underline',
                      },
                    })}
                  >
                    {originalWork.title_in_kor}
                  </Text>
                </Link>
              </OriginalWorkHoverCard.Trigger>
              <OriginalWorkHoverCard.Content
                originalWork={originalWork}
                side="top"
              />
            </OriginalWorkHoverCard.Root>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
}
