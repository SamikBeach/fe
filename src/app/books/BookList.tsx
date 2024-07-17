import { searchBooks } from '@apis/book';
import { BookCard } from '@components/BookCard';
import { Spinner } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

function BookList() {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['book'],
    queryFn: () => searchBooks({ take: 30 }),
    select: response => response.data.data,
  });

  return isLoading ? (
    <VStack height="calc(100vh - 128px)" justify="center">
      <Spinner size="3" />
    </VStack>
  ) : (
    <HStack py="30px" justify="center">
      <div className={css({ width: '1280px', px: '20px' })}>
        <HStack flexWrap="wrap" justifyContent="start" gap="20px">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </HStack>
      </div>
    </HStack>
  );
}

export default BookList;
