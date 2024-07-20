import { searchBooks } from '@apis/book';
import { BookCard } from '@components/BookCard';
import { Spinner } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';

function BookList() {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['book'],
    queryFn: () => searchBooks({ take: 30 }),
    select: response => response.data.data,
  });

  return isLoading ? (
    <VStack height="calc(100vh - 64px)" justify="center">
      <Spinner size="3" />
    </VStack>
  ) : (
    <VStack px="40px" py="40px" justify="center" width="100%" minWidth="600px">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </VStack>
  );
}

export default BookList;
