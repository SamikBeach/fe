import { SidePeek } from '@elements/SidePeek';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { getBookById } from '@apis/book';
import { useQuery } from '@tanstack/react-query';
import BookInfo from './BookInfo';
import SellerLink from './SellerLink';
import { Skeleton } from '@radix-ui/themes';

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
  const { data: book, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById({ id: bookId }),
    select: response => response.data,
    enabled: open,
  });

  return (
    <SidePeek.Root modal open={open} onOpenChange={onOpenChange} {...props}>
      {children}
      <SidePeek.Portal>
        <SidePeek.Content
          className={css({
            width: '400px',
            height: 'calc(100% - 100px)',
            marginRight: '6px',
          })}
        >
          {isLoading ? (
            <>
              <HStack alignItems="start">
                <Skeleton height="140px" width="100px" />
                <VStack alignItems="start" padding="10px">
                  <Skeleton width="180px" />
                  <Skeleton width="140px" />
                  <Skeleton width="100px" />
                </VStack>
              </HStack>
            </>
          ) : book === undefined ? null : (
            <VStack alignItems="start" width="100%" gap="16px" height="100%">
              <BookInfo book={book} />
              <SellerLink />
            </VStack>
          )}
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

BookSidePeek.Trigger = SidePeek.Trigger;
