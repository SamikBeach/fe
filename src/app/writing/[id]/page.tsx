'use client';

import { useQuery } from '@tanstack/react-query';
import { Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getWritingById } from '@apis/writing';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@radix-ui/react-icons';
import { AuthorAvatar } from '@components/AuthorAvatar';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const router = useRouter();

  const { data: writing } = useQuery({
    queryKey: ['writing', params.id],
    queryFn: () => getWritingById({ id: params.id }),
    select: response => response.data,
  });

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <HStack alignItems="start" gap="40px" width="100%">
        <img
          alt="writing_image"
          width={100}
          height={140}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Die_Traumdeutung_%28Congress_scan%29.jpg/440px-Die_Traumdeutung_%28Congress_scan%29.jpg"
        />
        <VStack alignItems="start" gap="0" width="100%">
          <HStack justify="space-between" width="100%">
            <Text size="6" weight="bold">
              {writing?.title}
            </Text>
            <HStack gap="0">
              <Text>123</Text>
              <HeartIcon color="red" />
            </HStack>
          </HStack>
          <Text size="4">{writing?.title_in_kor}</Text>
          <Text size="4">{writing?.title_in_eng}</Text>
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
            <Text size="4">{writing?.author.name}</Text>
          </HStack>
          <Text size="4">{writing?.publication_date}년</Text>
          <Text>{writing?.book.length} books</Text>
          <HStack>
            <Text size="2" color="gray">
              Ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              consectetur.
            </Text>
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
              <Text>차라투스트라는 이렇게 말했다</Text>
              <Text>박찬국</Text>
              <Text>(기타 등등 알라딘 제공 정보)</Text>
              <Text>{book.isbn}</Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
}
