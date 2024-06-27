'use client';

import { getAuthorById } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Separator, Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@radix-ui/react-icons';
import { AuthorAvatar } from '@components/AuthorAvatar';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const router = useRouter();

  const { data: author } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: params.id }),
    select: response => response.data,
  });

  const splitBornDate = author?.born_date?.split('-');
  const isValidBornDate =
    author?.born_date !== '' &&
    splitBornDate?.[1] !== '00' &&
    splitBornDate?.[2] !== '00';

  const splitDiedDate = author?.died_date?.split('-');
  const isValidDiedDate =
    author?.died_date !== '' &&
    splitDiedDate?.[1] !== '00' &&
    splitDiedDate?.[2] !== '00';

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <HStack justify="space-between" alignItems="start" width="100%">
        <HStack alignItems="start" gap="40px">
          <Avatar
            radius="full"
            src={author?.image_url}
            fallback={author?.name ?? ''}
            size="9"
          />
          <VStack alignItems="start" gap="0">
            <Text size="6" weight="bold">
              {author?.name}
            </Text>
            <Text size="4">{author?.name_in_kor}</Text>
            <HStack>
              <Text size="2" color="gray">
                {author?.born_date_is_bc ? '기원전 ' : ''}
                {isValidBornDate && author?.born_date != null
                  ? format(new Date(author.born_date), 'y년 M월 d일 ')
                  : '???'}
                - {author?.died_date_is_bc ? '기원전 ' : ''}
                {isValidDiedDate && author?.died_date != null
                  ? format(new Date(author.died_date), 'y년 M월 d일 ')
                  : '???'}
              </Text>
            </HStack>
            <Text size="1" color="gray">
              {author?.nationality?.nationality}
            </Text>
            <Text size="1">
              {author?.main_interest
                ?.map(mainInterest => mainInterest.main_interest)
                .join(', ')}
            </Text>
            <Text size="1">
              {author?.education
                ?.map(education => education.education)
                .join(', ')}
            </Text>
            <Text size="1">{author?.era?.map(era => era.era).join(', ')}</Text>
            <Text size="1">
              {author?.region?.map(region => region.region).join(', ')}
            </Text>
            <Text size="1">
              {author?.school?.map(school => school.school).join(', ')}
            </Text>
            <VStack gap="10px" alignItems="start">
              {(author?.influenced ?? []).length > 0 && (
                <VStack gap="4px" alignItems="start">
                  <Text size="1" color="gray">
                    Influenced to
                  </Text>
                  <HStack gap="4px">
                    {author?.influenced
                      .slice(0, 3)
                      .map(influenced => (
                        <AuthorAvatar size="1" author={influenced} />
                      ))}
                    +{author?.influenced.slice(3).length}
                  </HStack>
                </VStack>
              )}
              {(author?.influenced_by ?? []).length > 0 && (
                <VStack gap="4px" alignItems="start">
                  <Text size="1" color="gray">
                    Influenced by
                  </Text>
                  <HStack gap="4px">
                    {author?.influenced_by
                      .slice(0, 3)
                      .map(influencedBy => (
                        <AuthorAvatar size="1" author={influencedBy} />
                      ))}

                    {(author?.influenced_by ?? []).slice(3).length > 0
                      ? `+${author?.influenced_by.slice(3).length}`
                      : ''}
                  </HStack>
                </VStack>
              )}
            </VStack>
          </VStack>
        </HStack>
        <HStack>
          <HStack gap="0">
            <Text>123</Text>
            <HeartIcon color="red" />
          </HStack>
          <Text>362 comments</Text>
        </HStack>
      </HStack>
      <HStack alignItems="start" flexWrap="wrap" wordBreak="break-all">
        {author?.writing?.map(writing => (
          <VStack
            alignItems="start"
            className={css({ width: '100px', cursor: 'pointer' })}
            onClick={() => router.push(`/writing/${writing.id}`)}
          >
            <img
              alt="writing_image"
              width={100}
              height={140}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Die_Traumdeutung_%28Congress_scan%29.jpg/440px-Die_Traumdeutung_%28Congress_scan%29.jpg"
            />
            <Text>{writing.title}</Text>
            <Text>{writing.publication_date}년</Text>
            <Text weight="bold">번역서 {writing.book?.length}권</Text>
            {writing.book?.map(book => <Text>{book.isbn}</Text>)}
          </VStack>
        ))}
      </HStack>
      <Separator className={css({ width: '100%' })} />
      <VStack alignItems="start">
        <Text>미분류 번역서</Text>
        <HStack alignItems="start" flexWrap="wrap" wordBreak="break-all">
          {author?.book.map(book => (
            <VStack
              alignItems="start"
              className={css({ width: '100px', cursor: 'pointer' })}
              onClick={() => router.push(`/book/${book.id}`)}
            >
              <img
                alt="book_image"
                width={100}
                height={140}
                src="https://image.yes24.com/goods/426994/XL"
              />
              <Text>타이틀: 뿅뿅</Text>
              <Text>번역: 뿅뿅뿅</Text>
              <Text>{book.isbn}</Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
}
