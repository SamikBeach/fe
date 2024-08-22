/* eslint-disable react/no-unescaped-entities */
import { AuthorAvatar } from 'legacy_src/components/AuthorAvatar';
import { WritingHoverCard } from 'legacy_src/components/WritingHoverCard';
import { MOCK_AUTHOR, MOCK_WRITING1 } from 'legacy_src/constants/mocks';
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
      <div className={css({ display: 'inline' })}>
        <Avatar size="2" fallback="B" radius="full" mb="4px" />{' '}
        <BoldText>Bonggeun Jeong</BoldText> left a comment on{' '}
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
        </WritingHoverCard.Root>
        , an original work by{' '}
        <AuthorAvatar
          author={MOCK_AUTHOR}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />{' '}
        <span className={css({ fontSize: '13px', color: 'gray.500' })}>
          10m ago
        </span>
      </div>
      <p
        className={css({
          backgroundColor: ' gray.100',
          padding: '20px',
          mx: '10px',
          borderRadius: '8px',
        })}
      >
        ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem
        at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce
        nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu
        eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia
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
