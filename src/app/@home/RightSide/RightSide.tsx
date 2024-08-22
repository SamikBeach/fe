import { AuthorAvatar } from '@components/author/AuthorAvatar';
import {
  MOCK_AUTHOR,
  MOCK_AUTHOR2,
  MOCK_AUTHOR3,
  MOCK_AUTHOR4,
  MOCK_AUTHOR5,
  MOCK_ORIGINAL_WORK1,
  MOCK_ORIGINAL_WORK2,
  MOCK_ORIGINAL_WORK3,
  MOCK_ORIGINAL_WORK4,
  MOCK_ORIGINAL_WORK5,
} from '@constants/mocks';
import { css } from 'styled-system/css';
import { HStack, VStack, styled } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { OriginalWorkShort } from '@components/original_work/OriginalWorkShort';
import { GiBlackBook } from 'react-icons/gi';

export default function RightSide() {
  return (
    <VStack minWidth="300px" position="sticky" top="0" pt="84px">
      <VStack gap="8px" width="100%" alignItems="start">
        <Text className={css({ fontWeight: 'medium' })}>Trending Now</Text>
        <Section>
          <Text>Authors</Text>
          {[
            MOCK_AUTHOR,
            MOCK_AUTHOR2,
            MOCK_AUTHOR3,
            MOCK_AUTHOR4,
            MOCK_AUTHOR5,
          ].map(author => (
            <AuthorAvatar key={author.id} author={author} withName />
          ))}
        </Section>
        <Section className={css({ gap: '2px' })}>
          <Text>Original works</Text>
          {[
            MOCK_ORIGINAL_WORK1,
            MOCK_ORIGINAL_WORK2,
            MOCK_ORIGINAL_WORK3,
            MOCK_ORIGINAL_WORK4,
            MOCK_ORIGINAL_WORK5,
          ].map(originalWork => (
            <OriginalWorkShort
              key={originalWork.id}
              originalWork={originalWork}
            />
          ))}
        </Section>
        <Section className={css({ gap: '12px' })}>
          <Text>Editions</Text>
          {[
            'Also sprach Zarathustra',
            'History of the Peoples',
            'Passover Sermon',
            'The Gresham Lectures',
            'Womans Rights',
          ].map(title => (
            <EditionItem key={title} title={title} />
          ))}
        </Section>
      </VStack>
    </VStack>
  );
}

function EditionItem({ title }: { title: string }) {
  return (
    <HStack gap="6px">
      <GiBlackBook
        className={css({
          display: 'inline',
          cursor: 'pointer',
          color: 'gray.600',
        })}
        size="24px"
      />
      <BoldText>{title}</BoldText>
    </HStack>
  );
}

const Section = styled(VStack, {
  base: {
    alignItems: 'start',
    gap: '6px',
    width: '100%',
    bgColor: 'gray.100',
    fontSize: '14px',
    fontWeight: 'medium',
    borderRadius: '8px',
    px: '14px',
    py: '10px',
  },
});

const BoldText = styled('span', {
  base: {
    fontWeight: 'medium',
    cursor: 'pointer',

    _hover: {
      textDecoration: 'underline',
    },
  },
});
