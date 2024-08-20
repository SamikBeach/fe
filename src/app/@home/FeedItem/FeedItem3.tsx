/* eslint-disable react/no-unescaped-entities */
import { AuthorAvatar } from '@components/AuthorAvatar';
import { WritingHoverCard } from '@components/WritingHoverCard';
import { MOCK_AUTHOR, MOCK_WRITING1 } from '@constants/mocks';
import { Avatar } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { VStack, styled } from 'styled-system/jsx';
import { GiSecretBook } from 'react-icons/gi';

export default function FeedItem() {
  return (
    <VStack
      bgColor="white"
      alignItems="start"
      width="700px"
      padding="16px"
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.200"
      fontSize="14px"
    >
      <p>
        <Avatar size="2" fallback="B" radius="full" mb="4px" />{' '}
        <BoldText>Bonggeun Jeong</BoldText> likes{' '}
        <AuthorAvatar
          author={MOCK_AUTHOR}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />{' '}
        's original work,{' '}
        <WritingHoverCard.Root>
          <WritingHoverCard.Trigger>
            <span>
              <GiSecretBook
                className={css({
                  display: 'inline',
                  marginBottom: '2px',
                  cursor: 'pointer',
                  color: 'gray.600',
                })}
                size="24px"
              />{' '}
              <BoldText>Also spoke zarathustra</BoldText>
            </span>
          </WritingHoverCard.Trigger>
          <WritingHoverCard.Content writing={MOCK_WRITING1} side="top" />
        </WritingHoverCard.Root>{' '}
        <span className={css({ fontSize: '13px', color: 'gray.500' })}>
          10m ago
        </span>
      </p>
    </VStack>
  );
}

const BoldText = styled('span', {
  base: {
    fontWeight: 'medium',
    cursor: 'pointer',

    _hover: {
      textDecoration: 'underline',
    },
  },
});
