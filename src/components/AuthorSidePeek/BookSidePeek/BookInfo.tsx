import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { BookServerModel } from '@models/book';
import { format } from 'date-fns';

interface Props {
  book: BookServerModel;
}

export default function BookInfo({ book }: Props) {
  const { info } = book;

  return (
    <HStack gap="20px" alignItems="start" width="100%">
      <img alt="writing_image" width={100} height={140} src={info.cover} />
      <VStack alignItems="start" gap="2px">
        <Text size="3" weight="bold">
          {info.title}
        </Text>
        <Text size="2">{info.author}</Text>
        <Text size="2" color="gray">
          {info.publisher}
        </Text>
        <Text size="2" color="gray">
          {format(new Date(info.pubDate), 'y년 M월 d일')}
        </Text>
        <Text size="2">{info.description}</Text>
      </VStack>
    </HStack>
  );
}
