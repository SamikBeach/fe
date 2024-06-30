import { WritingServerModel } from '@models/writing';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';

interface Props {
  writings?: WritingServerModel[];
}

export default function WritingList({ writings = [] }: Props) {
  const router = useRouter();

  return (
    <HStack alignItems="start" flexWrap="wrap" wordBreak="break-all">
      {writings.map(({ id, title, publication_date, books }) => (
        <VStack
          alignItems="start"
          className={css({ width: '100px', cursor: 'pointer' })}
          onClick={() => router.push(`/writing/${id}`)}
        >
          <img
            alt="writing_image"
            width={100}
            height={140}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Die_Traumdeutung_%28Congress_scan%29.jpg/440px-Die_Traumdeutung_%28Congress_scan%29.jpg"
          />
          <Text>{title}</Text>
          <Text>{publication_date}년</Text>
          <Text weight="bold">번역서 {books.length}권</Text>
          {books.map(book => (
            <Text>{book.isbn}</Text>
          ))}
        </VStack>
      ))}
    </HStack>
  );
}
