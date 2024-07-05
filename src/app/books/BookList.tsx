import { searchBooks } from '@apis/book';
import { BookCard } from '@components/BookCard';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

function BookList() {
  const { data: books = [] } = useQuery({
    queryKey: ['book'],
    queryFn: () => searchBooks({ take: 30 }),
    select: response => response.data.data,
  });

  return (
    <Grid columns={3} className={css({ padding: '20px' })} gap="20px">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </Grid>
  );
}

export default BookList;
