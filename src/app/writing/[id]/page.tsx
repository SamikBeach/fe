'use client';

import { useQuery } from '@tanstack/react-query';
import { Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getWritingById } from '@apis/writing';
import { useRouter } from 'next/navigation';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const router = useRouter();

  const { data: writing } = useQuery({
    queryKey: ['writing', params.id],
    queryFn: () => getWritingById({ id: params.id }),
    select: response => response.data,
  });

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <HStack alignItems="start" gap="40px">
        <img
          alt="writing_image"
          width={100}
          height={140}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Die_Traumdeutung_%28Congress_scan%29.jpg/440px-Die_Traumdeutung_%28Congress_scan%29.jpg"
        />
        <VStack alignItems="start" gap="0">
          <Text size="6" weight="bold">
            {writing?.title}
          </Text>
          <Text size="4">{writing?.title_in_kor}</Text>
          <HStack>
            <Text size="2" color="gray">
              Writing 설명
            </Text>
            <Text>{writing?.book.length} books</Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack alignItems="start">
        <Text>번역서</Text>
        <HStack alignItems="start" flexWrap="wrap" wordBreak="break-all">
          {writing?.book.map(book => (
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
              <Text>{book.isbn}</Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
}
