import { useRouter } from 'next/navigation';
import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { BookServerModel } from '@models/book';
import { css } from 'styled-system/css';

interface Props {
  books?: BookServerModel[];
}

export default function BookList({ books = [] }: Props) {
  const router = useRouter();

  return (
    <VStack alignItems="start">
      <Text>미분류 번역서</Text>
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
            <Text>타이틀: 뿅뿅</Text>
            <Text>번역: 뿅뿅뿅</Text>
            <Text>{book.isbn}</Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
