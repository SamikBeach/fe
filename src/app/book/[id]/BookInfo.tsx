import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { HeartIcon } from '@radix-ui/react-icons';
import { AuthorAvatar } from '@components/AuthorAvatar';
import { MOCK_AUTHOR } from '@constants/mocks';
import { BookServerModel } from '@models/book';

interface Props {
  book: BookServerModel;
}

export default function BookInfo({ book }: Props) {
  return (
    <HStack alignItems="start" gap="40px">
      <img
        alt="book_image"
        width={100}
        height={140}
        src="https://image.yes24.com/goods/426994/XL"
      />
      <VStack alignItems="start" gap="0">
        <HStack justify="space-between" width="100%">
          <Text size="6" weight="bold">
            차라투스트라는 이렇게 말했다
          </Text>
          <HStack gap="0">
            <Text>123</Text>
            <HeartIcon color="red" />
          </HStack>
        </HStack>
        <HStack>
          <AuthorAvatar author={MOCK_AUTHOR} />
          <Text>프리드리히 니체</Text>
        </HStack>
        <Text size="4">박찬국</Text>
        <Text size="6" weight="bold">
          {book.isbn}
        </Text>
        <HStack>
          <Text size="2" color="gray">
            Ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            consectetur. Ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla consectetur.Ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla consectetur. Ipsum dolor sit amet, consectetur adipiscing
            elit. Nulla consectetur.Ipsum dolor sit amet, consectetur adipiscing
            elit. Nulla consectetur. Ipsum dolor sit amet, consectetur
            adipiscing elit. Nulla consectetur. (기타 알라딘 제공 정보)
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
