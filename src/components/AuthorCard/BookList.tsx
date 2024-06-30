import { HStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { BookServerModel } from '@models/book';

interface Props {
  books?: BookServerModel[];
}

export default function BookList({ books = [] }: Props) {
  return (
    <HStack>
      {[1, 2, 3].map(() => (
        <img
          src="https://image.yes24.com/goods/426994/XL"
          width={23}
          height={30}
        />
      ))}
      <Text size="1">{books.length} books</Text>
    </HStack>
  );
}
