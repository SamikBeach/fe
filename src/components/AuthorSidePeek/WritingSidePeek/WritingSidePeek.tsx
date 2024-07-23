import { SidePeek } from '@elements/SidePeek';
import { Separator, Skeleton, Spinner } from '@radix-ui/themes';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { getWritingById } from '@apis/writing';
import { useQuery } from '@tanstack/react-query';
import WritingInfo from './WritingInfo';
import BookList from './BookList';
import { HStack, VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof SidePeek.Root> {
  children?: ReactNode;
  writingId: number;
}

export default function WritingSidePeek({
  children,
  writingId,
  open,
  onOpenChange,
  ...props
}: Props) {
  const { data: writing, isLoading } = useQuery({
    queryKey: ['writing', writingId],
    queryFn: () => getWritingById({ id: writingId }),
    select: response => response.data,
    enabled: open,
  });

  return (
    <SidePeek.Root modal open={open} onOpenChange={onOpenChange} {...props}>
      {children}
      <SidePeek.Portal>
        {/* <SidePeek.Overlay /> */}
        {isLoading && (
          <VStack height="100%">
            <Spinner />
          </VStack>
        )}
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
          ) : writing === undefined ? null : (
            <VStack gap="16px" height="100%" width="100%">
              <WritingInfo writing={writing} />
              <Separator className={css({ width: '100%' })} />
              <BookList writingId={writing.id} />
            </VStack>
          )}
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

WritingSidePeek.Trigger = SidePeek.Trigger;
