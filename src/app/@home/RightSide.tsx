import { AuthorAvatar } from '@components/AuthorAvatar';
import {
  MOCK_AUTHOR,
  MOCK_AUTHOR2,
  MOCK_AUTHOR3,
  MOCK_AUTHOR4,
  MOCK_AUTHOR5,
  MOCK_WRITING1,
  MOCK_WRITING2,
  MOCK_WRITING3,
  MOCK_WRITING4,
  MOCK_WRITING5,
} from '@constants/mocks';
import { css } from 'styled-system/css';
import { HStack, VStack, styled } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { OriginalWorkAvatar } from '@components/OriginalWorkAvatar';
import { GiBlackBook } from 'react-icons/gi';

export default function RightSide() {
  return (
    <VStack width="300px">
      <VStack gap="8px" position="fixed" width="300px" alignItems="start">
        <p className={css({ fontWeight: 'medium' })}>Trending Now</p>
        <Section>
          <Text>Author</Text>
          <AuthorAvatar author={MOCK_AUTHOR} withName />
          <AuthorAvatar author={MOCK_AUTHOR2} withName />
          <AuthorAvatar author={MOCK_AUTHOR3} withName />
          <AuthorAvatar author={MOCK_AUTHOR4} withName />
          <AuthorAvatar author={MOCK_AUTHOR5} withName />
        </Section>
        <Section className={css({ gap: '2px' })}>
          <Text>Original works</Text>
          <OriginalWorkAvatar writing={MOCK_WRITING1} withName />
          <OriginalWorkAvatar writing={MOCK_WRITING2} withName />
          <OriginalWorkAvatar writing={MOCK_WRITING3} withName />
          <OriginalWorkAvatar writing={MOCK_WRITING4} withName />
          <OriginalWorkAvatar writing={MOCK_WRITING5} withName />
        </Section>
        <Section className={css({ gap: '12px' })}>
          <Text>Editions</Text>
          <EditionItem title="Also sprach Zarathustra" />
          <EditionItem title="History of the Peoples" />
          <EditionItem title="Passover Sermon" />
          <EditionItem title="The Gresham Lectures" />
          <EditionItem title="Woman's Rights" />
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
