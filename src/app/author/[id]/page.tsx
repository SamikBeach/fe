'use client';

import { getAuthorById } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { AuthorInfo } from './AuthorInfo';
import { AuthorCommentList } from './AuthorCommentList';

export default function AuthorPage({ params }: { params: { id: number } }) {
  return (
    <HStack
      alignItems="start"
      justify="center"
      className={css({ width: '100%' })}
    >
      <AuthorInfo height="100%" />
      <AuthorCommentList />
    </HStack>
  );
}
