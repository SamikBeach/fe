import { searchBooks } from '@apis/book';
import { BookCard } from '@components/BookCard';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

function BookList() {
  const router = useRouter();

  const { data: books = [] } = useQuery({
    queryKey: ['book'],
    queryFn: () => searchBooks(),
    select: response => response.data,
  });

  return (
    <Grid columns={3} className={css({ padding: '20px' })} gap="20px">
      {books.slice(0, 60).map(book => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => router.push(`/book/${book.id}`)}
        />
      ))}
    </Grid>
  );
}

export default BookList;
