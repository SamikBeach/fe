'use client';

import { getAuthorById } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { Separator, Spinner } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import WritingTable from './WritingTable';
import { AuthorInfo } from './AuthorInfo';
import BookTable from './BookTable';
import { useState } from 'react';
import TableSegmentControl from './TableSegmentControl';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const [tableType, setTableType] = useState<'writing' | 'book'>('writing');

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
    <VStack
      alignItems="center"
      className={css({ width: '1280px', py: '60px' })}
      gap="30px"
    >
      <AuthorInfo author={author} />
      <Separator className={css({ width: '100%' })} />
      <TableSegmentControl tableType={tableType} setTableType={setTableType} />
      {tableType === 'writing' ? (
        <WritingTable writings={author.writings} />
      ) : (
        <BookTable books={author.books} />
      )}
    </VStack>
  );
}
