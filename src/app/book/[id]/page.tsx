'use client';

import { useQuery } from '@tanstack/react-query';
import { Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getBookById } from '@apis/book';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const { data: book } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getBookById({ id: params.id }),
    select: response => response.data,
  });

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <HStack alignItems="start" gap="40px">
        <img
          alt="book_image"
          width={100}
          height={140}
          src="https://image.yes24.com/goods/426994/XL"
        />
        <VStack alignItems="start" gap="0">
          <Text size="6" weight="bold">
            {book?.isbn}
          </Text>
          <HStack>
            <Text size="2" color="gray">
              Book 설명
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack alignItems="start">구매링크?</VStack>
    </VStack>
  );
}
