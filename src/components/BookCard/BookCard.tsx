import { BookServerModel } from '@models/book';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
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
    <HStack
      alignItems="start"
      gap="20px"
      width="100%"
      borderRadius="8px"
      backgroundColor="white"
      px="20px"
      py="10px"
    >
      <img
        src={cover}
        width={140}
        height={200}
        className={css({
          cursor: 'pointer',
          borderRadius: '6px',
          height: '200px',
          width: '140px',
        })}
        onClick={() => router.push(`/book/${book.id}`)}
      />
      <Text>{title}</Text>
    </HStack>
  );
}

export default BookCard;
