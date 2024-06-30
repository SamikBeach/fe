import { WritingServerModel } from '@models/writing';
import { HeartIcon } from '@radix-ui/react-icons';
import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { MOCK_AUTHOR } from '@constants/mocks';
import { AuthorAvatar } from '@components/AuthorAvatar';

interface Props {
  writing: WritingServerModel;
}

export default function WritingInfo({ writing }: Props) {
  return (
    <HStack alignItems="start" gap="40px" width="100%">
      <img
        alt="writing_image"
        width={100}
        height={140}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Die_Traumdeutung_%28Congress_scan%29.jpg/440px-Die_Traumdeutung_%28Congress_scan%29.jpg"
      />
      <VStack alignItems="start" gap="0" width="100%">
        <HStack justify="space-between" width="100%">
          <Text size="6" weight="bold">
            {writing.title}
          </Text>
          <HStack gap="0">
            <Text>123</Text>
            <HeartIcon color="red" />
          </HStack>
        </HStack>
        <Text size="4">{writing.title_in_kor}</Text>
        <Text size="4">{writing.title_in_eng}</Text>
        <HStack>
          <AuthorAvatar author={MOCK_AUTHOR} />
          <Text size="4">{writing.author.name}</Text>
        </HStack>
        <Text size="4">{writing.publication_date}년</Text>
        <Text>{writing.books.length} books</Text>
        <HStack>
          <Text size="2" color="gray">
            Ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            consectetur.
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
