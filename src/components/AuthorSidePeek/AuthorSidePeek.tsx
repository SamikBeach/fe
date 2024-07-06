import { SidePeek } from '@elements/SidePeek';
import { Flex, Separator, Spinner } from '@radix-ui/themes';
import { ComponentProps, useState } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { getAuthorById } from '@apis/author';
import WritingTable from './WritingTable';
import BookInfo from './BookTable';
import { AuthorInfo } from './AuthorInfo';
import TableSegmentControl from './TableSegmentControl';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof SidePeek.Root> {
  authorId: number;
}

export default function AuthorSidePeek({
  children,
  authorId,
  open,
  onOpenChange,
  ...props
}: Props) {
  const [selectedWritingId, setSelectedWritingId] = useState<number | null>(
    null
  );
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [tableType, setTableType] = useState<'writing' | 'book'>('writing');

  const isOpenSidePeek = selectedWritingId !== null || selectedBookId !== null;

  const { data: author, isLoading } = useQuery({
    queryKey: ['author', authorId],
    queryFn: () => getAuthorById({ id: authorId }),
    select: response => response.data,
    enabled: open,
  });

  return (
    <SidePeek.Root
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
      <SidePeek.Portal>
        <SidePeek.Content
          className={css({
            width: '800px',
            height: 'calc(100vh - 64px - 24px)',
          })}
        >
          {isOpenSidePeek && (
            <div
              className={css({
                background: 'rgba(0 0 0 / 0.2)',
                position: 'fixed',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '12px',
              })}
            />
          )}
          {isLoading || author === undefined ? (
            <VStack height="100%" justify="center">
              <Spinner size="3" />
            </VStack>
          ) : (
            <Flex direction="column" gap="16px" height="100%">
              <AuthorInfo author={author} />
              <Separator orientation="horizontal" size="4" />
              <TableSegmentControl
                defaultValue={tableType}
                onValueChange={value =>
                  setTableType(value as 'writing' | 'book')
                }
              />
              {tableType === 'writing' && (
                <WritingTable
                  selectedWritingId={selectedWritingId}
                  setSelectedWritingId={setSelectedWritingId}
                  writings={author.writings ?? []}
                />
              )}
              {tableType === 'book' && (
                <BookInfo
                  selectedBookId={selectedBookId}
                  setSelectedBookId={setSelectedBookId}
                  books={author?.books ?? []}
                />
              )}
            </Flex>
          )}
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}
