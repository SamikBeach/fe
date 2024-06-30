import { SidePeek } from '@elements/SidePeek';
import { Flex, Separator } from '@radix-ui/themes';
import { ComponentProps, useState } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { getAuthorById } from '@apis/author';
import WritingInfo from './WritingInfo';
import BookInfo from './BookInfo';
import { AuthorInfo } from './AuthorInfo';
import WritingAndBookSegmentedControl from './WritingAndBookSegmentedControl';

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
  const [selectedTab, setSelectedTab] = useState<'writing' | 'book'>('writing');

  const isOpenSidePeek = selectedWritingId !== null || selectedBookId !== null;

  const { data: author } = useQuery({
    queryKey: ['author', authorId],
    queryFn: () => getAuthorById({ id: authorId }),
    select: response => response.data,
    enabled: open,
  });

  if (author === undefined) {
    return null;
  }

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
          <Flex direction="column" gap="16px" height="100%">
            <AuthorInfo author={author} />
            <Separator orientation="horizontal" size="4" />
            <WritingAndBookSegmentedControl
              onValueChange={value =>
                setSelectedTab(value as 'writing' | 'book')
              }
            />
            {selectedTab === 'writing' && (
              <WritingInfo
                selectedWritingId={selectedWritingId}
                setSelectedWritingId={setSelectedWritingId}
                writings={author.writings ?? []}
              />
            )}
            {selectedTab === 'book' && (
              <BookInfo
                selectedBookId={selectedBookId}
                setSelectedBookId={setSelectedBookId}
                books={author?.books ?? []}
              />
            )}
          </Flex>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}
