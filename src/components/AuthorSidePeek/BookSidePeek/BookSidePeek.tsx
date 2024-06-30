import { SidePeek } from '@elements/SidePeek';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import { getBookById } from '@apis/book';
import { useQuery } from '@tanstack/react-query';
import BookInfo from './BookInfo';
import SellerLink from './SellerLink';

interface Props extends ComponentProps<typeof SidePeek.Root> {
  children?: ReactNode;
  bookId: number;
}

export default function BookSidePeek({
  children,
  bookId,
  open,
  onOpenChange,
  ...props
}: Props) {
  const { data: book } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById({ id: bookId }),
    select: response => response.data,
    enabled: open,
  });

  if (book === undefined) {
    return null;
  }

  return (
    <SidePeek.Root modal open={open} onOpenChange={onOpenChange} {...props}>
      {children}
      <SidePeek.Portal>
        <SidePeek.Content
          className={css({
            width: '400px',
            height: 'calc(100% - 120px)',
            marginRight: '16px',
          })}
        >
          <VStack alignItems="start" gap="16px" height="100%">
            <BookInfo book={book} />
            <SellerLink />
          </VStack>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

BookSidePeek.Trigger = SidePeek.Trigger;
