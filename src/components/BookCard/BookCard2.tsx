import { BookServerModel } from '@models/book';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { useRouter } from 'next/navigation';
import BookInfo from './BookInfo';

interface Props {
  book: BookServerModel;
}

function BookCard({ book }: Props) {
  const router = useRouter();

  const {
    info: { cover },
  } = book;

  return (
    <HStack
      className={css({
        backgroundColor: 'white',
        width: '600px',
        height: '200px',
        borderRadius: '6px',
      })}
      alignItems="start"
      gap="0px"
    >
      <img
        src={cover}
        width={140}
        height={200}
        className={css({
          cursor: 'pointer',
          borderLeftRadius: '6px',
          height: '200px',
          width: '140px',
        })}
        onClick={() => router.push(`/book/${book.id}`)}
      />
      <BookInfo book={book} />
    </HStack>
  );
}

export default BookCard;
