'use client';

import { useQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getBookById } from '@apis/book';
import BuyLink from './BuyLink';
import BookInfo from './BookInfo';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const { data: book } = useQuery({
    queryKey: ['book', params.id],
    queryFn: () => getBookById({ id: params.id }),
    select: response => response.data,
  });

  if (book === undefined) {
    return null;
  }

  return (
    <VStack alignItems="start" className={css({ width: '1160px' })} gap="40px">
      <BookInfo book={book} />
      <BuyLink />
    </VStack>
  );
}
