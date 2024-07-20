'use client';

import { HStack, VStack } from 'styled-system/jsx';
import BookList from './BookList';
import { css } from 'styled-system/css';
import { BookFilterBox } from '@components/BookFilterBox';

export default function BookPage() {
  return (
    <HStack gap="0px" height="calc(100vh - 64px)" alignItems="start">
      <VStack
        width="300px"
        height="100%"
        className={css({
          boxShadow: '1px 0 0 rgba(0, 0, 0, 0.05)',
        })}
      >
        <BookFilterBox />
      </VStack>
      <HStack width="calc(100vw - 300px)">
        <BookList />
      </HStack>
    </HStack>
  );
}
