'use client';

import { getAuthorById } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { format } from 'date-fns';

export default function AuthorPage({ params }: { params: { id: number } }) {
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
        </VStack>
      </HStack>
      <HStack alignItems="start" flexWrap="wrap" wordBreak="break-all">
        {author?.writing.map(writing => (
          <VStack alignItems="start" className={css({ width: '100px' })}>
            <img
              alt="writing_image"
              width={100}
              height={140}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Die_Traumdeutung_%28Congress_scan%29.jpg/440px-Die_Traumdeutung_%28Congress_scan%29.jpg"
            />
            <Text>{writing.title}</Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
