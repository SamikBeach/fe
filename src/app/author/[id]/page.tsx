'use client';

import { getAuthorById } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { Separator } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import WritingList from './WritingList';
import BookList from './BookList';
import { AuthorInfo } from './AuthorInfo';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const { data: author } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: params.id }),
    select: response => response.data,
  });

  if (author === undefined) {
    return null;
  }

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <AuthorInfo author={author} />
      <WritingList writings={author.writings} />
      <Separator className={css({ width: '100%' })} />
      <BookList books={author.books} />
    </VStack>
  );
}
