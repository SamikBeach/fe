import { SidePeek } from 'legacy_src/elements/SidePeek';
import { Spinner } from '@radix-ui/themes';
import { ComponentProps, useState } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { getAuthorById } from 'legacy_src/apis/author';
import { AuthorInfo } from './AuthorInfo';
import { HStack, VStack } from 'styled-system/jsx';
import { WritingAndBookInfo } from './WritingAndBookInfo';

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
                zIndex: 2,
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
            <HStack
              alignItems="start"
              justify="space-between"
              className={css({ width: '100%', height: '100%' })}
              gap="0px"
            >
              <AuthorInfo author={author} width="300px" />
              <WritingAndBookInfo
                author={author}
                selectedWritingId={selectedWritingId}
                setSelectedWritingId={setSelectedWritingId}
                selectedBookId={selectedBookId}
                setSelectedBookId={setSelectedBookId}
              />
            </HStack>
          )}
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}
