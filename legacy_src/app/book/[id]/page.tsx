'use client';

import { useQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getBookById } from 'legacy_src/apis/book';
import BuyLink from './BuyLink';
import BookInfo from './BookInfo';
import { Separator, Spinner } from '@radix-ui/themes';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const { data: book, isLoading } = useQuery({
    queryKey: ['book', params.id],
    queryFn: () => getBookById({ id: params.id }),
    select: response => response.data,
  });

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 64px)" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  if (book === undefined) {
    return null;
  }

  return (
    <VStack
      alignItems="start"
      className={css({ width: '1280px', py: '60px' })}
      gap="30px"
    >
      <BookInfo book={book} />
      <Separator className={css({ width: '100%' })} />
      <BuyLink />
    </VStack>
  );
}
