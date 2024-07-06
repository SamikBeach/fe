import { WritingServerModel } from '@models/writing';
import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';

interface Props {
  writing: WritingServerModel;
}

export default function WritingInfo({ writing }: Props) {
  const { title, title_in_kor, title_in_eng, author, publication_date } =
    writing;

  return (
    <HStack gap="40px" alignItems="start" width="100%">
      <img
        alt="writing_image"
        width={100}
        height={140}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Die_Traumdeutung_%28Congress_scan%29.jpg/440px-Die_Traumdeutung_%28Congress_scan%29.jpg"
      />
      <VStack alignItems="start" gap="2px">
        <Text size="6" weight="bold">
          {title}
        </Text>
        <Text size="4">{title_in_eng}</Text>
        <Text size="4">{title_in_kor}</Text>
        <Text size="2" color="gray">
          {author.name}
        </Text>
        <Text size="2" color="gray">
          {publication_date}
        </Text>
      </VStack>
    </HStack>
  );
}
