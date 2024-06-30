import { AuthorAvatar } from '@components/AuthorAvatar';
import { MOCK_AUTHOR } from '@constants/mocks';
import { WritingServerModel } from '@models/writing';
import { Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  writing: WritingServerModel;
}

function WritingInfo({ writing }: Props) {
  const { title, publication_date, author, books } = writing;

  return (
    <HStack gap="16px" alignItems="start">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
        height={140}
        width={100}
      />
      <VStack alignItems="start" gap="0px">
        <Text
          weight="bold"
          className={css({ fontWeight: 'bold', fontSize: '20px' })}
        >
          {title}
        </Text>
        <Text className={css({ fontSize: '14px', color: 'gray.500' })}>
          {publication_date}
        </Text>
        <HStack>
          <AuthorAvatar author={MOCK_AUTHOR} />
          <Text size="4">{author.name}</Text>
        </HStack>
        <Text>{books.length} books</Text>
        <Text size="2" color="gray">
          Ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur.
        </Text>
      </VStack>
    </HStack>
  );
}

export default WritingInfo;
