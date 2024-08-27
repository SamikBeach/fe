'use client';

import { getAuthorById } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { AuthorInfo } from './AuthorInfo';
import { CommentList } from './CommentList';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const { data: author, isLoading } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: params.id }),
    select: response => response.data,
  });

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 64px)" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  if (author === undefined) {
    return null;
  }

  return (
    <HStack
      alignItems="start"
      justify="center"
      className={css({ width: '100%' })}
    >
      <AuthorInfo author={author} height="100%" />
      <CommentList authorId={author.id} />
    </HStack>
  );
}
