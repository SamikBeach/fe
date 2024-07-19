'use client';

import { useQuery } from '@tanstack/react-query';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getWritingById } from '@apis/writing';

import WritingInfo from './WritingInfo';
import { Spinner } from '@radix-ui/themes';
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
    <HStack
      alignItems="start"
      justify="space-between"
      className={css({ width: '1180px', py: '40px' })}
      gap="30px"
    >
      <WritingInfo writing={writing} width="400px" />
      <BookTable books={writing.books} />
    </HStack>
  );
}
