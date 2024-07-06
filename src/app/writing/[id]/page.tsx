'use client';

import { useQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getWritingById } from '@apis/writing';

import WritingInfo from './WritingInfo';
import BookList from './BookTable';
import { Separator, Spinner } from '@radix-ui/themes';
import BookTable from './BookTable';

export default function WritingPage({ params }: { params: { id: number } }) {
  const { data: writing, isLoading } = useQuery({
    queryKey: ['writing', params.id],
    queryFn: () => getWritingById({ id: params.id }),
    select: response => response.data,
  });

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 64px)" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  if (writing === undefined) {
    return null;
  }

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <WritingInfo writing={writing} />
      <Separator className={css({ width: '100%' })} />
      <BookTable books={writing.books} />
    </VStack>
  );
}
