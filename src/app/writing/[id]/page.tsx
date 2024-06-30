'use client';

import { useQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getWritingById } from '@apis/writing';

import WritingInfo from './WritingInfo';
import BookList from './BookList';

export default function WritingPage({ params }: { params: { id: number } }) {
  const { data: writing } = useQuery({
    queryKey: ['writing', params.id],
    queryFn: () => getWritingById({ id: params.id }),
    select: response => response.data,
  });

  if (writing === undefined) {
    return null;
  }

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <WritingInfo writing={writing} />
      <BookList books={writing.books} />
    </VStack>
  );
}
