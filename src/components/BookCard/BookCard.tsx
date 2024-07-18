import { BookServerModel } from '@models/book';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';

interface Props {
  book: BookServerModel;
}

function BookCard({ book }: Props) {
  const router = useRouter();

  const {
    info: { cover, title },
  } = book;

  return (
    <VStack gap="4px">
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
      <Text>{title}</Text>
    </VStack>
  );
}

export default BookCard;
