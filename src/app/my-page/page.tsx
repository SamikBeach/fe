'use client';

import { Avatar, Text } from '@radix-ui/themes';
import { HStack, VStack, styled } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { AuthorAvatar } from '@components/AuthorAvatar';
import {
  MOCK_AUTHOR,
  MOCK_AUTHOR2,
  MOCK_AUTHOR3,
  MOCK_AUTHOR4,
  MOCK_WRITING1,
  MOCK_WRITING2,
  MOCK_WRITING3,
  MOCK_WRITING4,
  MOCK_WRITING5,
} from '@constants/mocks';
import { OriginalWorkAvatar } from '@components/OriginalWorkAvatar';
import { GiBlackBook } from 'react-icons/gi';

export default function MyPage() {
  return (
    <HStack
      alignItems="start"
      justify="space-between"
      className={css({ width: '1180px', py: '40px' })}
      gap="50px"
    >
      <VStack gap="20px" width="260px" alignItems="start">
        <Avatar
          radius="full"
          fallback="B"
          size="9"
          className={css({
            width: '260px',
            height: '260px',
            margin: '0 auto',
          })}
        />
        <Text weight="bold" size="6">
          Bonggeun Jeong
        </Text>
      </VStack>

      <VStack
        width="100%"
        alignItems="start"
        padding="20px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="8px"
      >
        <Text weight="medium" size="4" ml="4px">
          Likes
        </Text>
        <VStack
          width="100%"
          alignItems="start"
          py="10px"
          px="16px"
          borderRadius="8px"
        >
          <Text size="2" weight="medium">
            Authors
          </Text>
          <HStack gap="6px">
            <AuthorAvatar
              className={css({ cursor: 'pointer' })}
              author={MOCK_AUTHOR}
            />
            <AuthorAvatar
              className={css({ cursor: 'pointer' })}
              author={MOCK_AUTHOR2}
            />
            <AuthorAvatar
              className={css({ cursor: 'pointer' })}
              author={MOCK_AUTHOR3}
            />
            <AuthorAvatar
              className={css({ cursor: 'pointer' })}
              author={MOCK_AUTHOR4}
            />
          </HStack>
        </VStack>

        <VStack
          width="100%"
          alignItems="start"
          py="10px"
          px="16px"
          borderRadius="8px"
        >
          <Text size="2" weight="medium">
            Original works
          </Text>
          <HStack gap="6px" flexWrap="wrap">
            <ItemWrapper>
              <OriginalWorkAvatar writing={MOCK_WRITING1} withName />
            </ItemWrapper>
            <ItemWrapper>
              <OriginalWorkAvatar writing={MOCK_WRITING2} withName />
            </ItemWrapper>
            <ItemWrapper>
              <OriginalWorkAvatar writing={MOCK_WRITING3} withName />
            </ItemWrapper>
            <ItemWrapper>
              <OriginalWorkAvatar writing={MOCK_WRITING4} withName />
            </ItemWrapper>
            <ItemWrapper>
              <OriginalWorkAvatar writing={MOCK_WRITING5} withName />
            </ItemWrapper>
          </HStack>
        </VStack>

        <VStack
          width="100%"
          alignItems="start"
          py="10px"
          px="16px"
          borderRadius="8px"
        >
          <Text size="2" weight="medium">
            Editions
          </Text>
          <HStack gap="6px" flexWrap="wrap">
            <ItemWrapper>
              <EditionItem title="Also sprach Zarathustra" />
            </ItemWrapper>
            <ItemWrapper>
              <EditionItem title="History of the Peoples" />
            </ItemWrapper>
            <ItemWrapper>
              <EditionItem title="Passover Sermon" />
            </ItemWrapper>
            <ItemWrapper>
              <EditionItem title="The Gresham Lectures" />
            </ItemWrapper>
            <ItemWrapper>
              <EditionItem title="Woman's Rights" />
            </ItemWrapper>
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
}

const ItemWrapper = styled('div', {
  base: {
    backgroundColor: 'gray.100',
    px: '14px',
    py: '6px',
    borderRadius: '8px',
  },
});

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

const BoldText = styled('span', {
  base: {
    fontWeight: 'medium',
    cursor: 'pointer',
    fontSize: '14px',

    _hover: {
      textDecoration: 'underline',
    },
  },
});
