/* eslint-disable react/no-unescaped-entities */
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { MOCK_AUTHOR } from '@constants/mocks';
import { Avatar } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { VStack, styled } from 'styled-system/jsx';
import { GiBlackBook } from 'react-icons/gi';

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
      display="inline"
    >
      <Avatar size="2" fallback="B" radius="full" mb="4px" />{' '}
      <BoldText>Bonggeun Jeong</BoldText> likes{' '}
      <GiBlackBook
        className={css({
          display: 'inline',
          marginBottom: '2px',
          cursor: 'pointer',
          color: 'gray.600',
        })}
        size="24px"
      />{' '}
      <BoldText>Also spoke zarathustra</BoldText>, an edition of a work by{' '}
      <AuthorAvatar
        author={MOCK_AUTHOR}
        mb="4px"
        className={css({ cursor: 'pointer' })}
        withName
      />{' '}
      <span className={css({ fontSize: '13px', color: 'gray.500' })}>
        10m ago
      </span>
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
