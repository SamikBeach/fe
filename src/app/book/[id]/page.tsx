'use client';

import { useQuery } from '@tanstack/react-query';
import { Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getBookById } from '@apis/book';
import { AuthorAvatar } from '@components/AuthorAvatar';
import { HeartIcon } from '@radix-ui/react-icons';

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
          <HStack justify="space-between" width="100%">
            <Text size="6" weight="bold">
              차라투스트라는 이렇게 말했다
            </Text>
            <HStack gap="0">
              <Text>123</Text>
              <HeartIcon color="red" />
            </HStack>
          </HStack>
          <HStack>
            <AuthorAvatar
              author={{
                id: 1,
                name: 'Friedrich Nietzsche',
                name_in_kor: '프리드리히 니체',
                born_date: '1844-10-15',
                born_date_is_bc: null,
                died_date: '1900-08-25',
                died_date_is_bc: null,
                image_url:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/472px-Nietzsche187a.jpg',
                influenced: [],
                influenced_by: [],
                writing: [],
                book: [],
              }}
            />
            <Text>프리드리히 니체</Text>
          </HStack>
          <Text size="4">박찬국</Text>
          <Text size="6" weight="bold">
            {book?.isbn}
          </Text>
          <HStack>
            <Text size="2" color="gray">
              Ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              consectetur. Ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla consectetur.Ipsum dolor sit amet, consectetur adipiscing
              elit. Nulla consectetur. Ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla consectetur.Ipsum dolor sit amet,
              consectetur adipiscing elit. Nulla consectetur. Ipsum dolor sit
              amet, consectetur adipiscing elit. Nulla consectetur. (기타 알라딘
              제공 정보)
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack alignItems="start">구매링크?</VStack>
    </VStack>
  );
}
