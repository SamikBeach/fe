import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useRouter } from 'next/navigation';
import { BookServerModel } from '@models/book';

interface Props {
  books: BookServerModel[];
}

export default function BookList({ books }: Props) {
  const router = useRouter();

  return (
    <VStack alignItems="start">
      <Text>번역서</Text>
      <HStack alignItems="start" flexWrap="wrap" wordBreak="break-all">
        {books.map(book => (
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
  );
}
