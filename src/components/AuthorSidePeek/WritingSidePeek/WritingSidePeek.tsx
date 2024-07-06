import { SidePeek } from '@elements/SidePeek';
import { Flex, Separator } from '@radix-ui/themes';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { getWritingById } from '@apis/writing';
import { useQuery } from '@tanstack/react-query';
import WritingInfo from './WritingInfo';
import BookTable from './BookTable';

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
  const { data: writing } = useQuery({
    queryKey: ['writing', writingId],
    queryFn: () => getWritingById({ id: writingId }),
    select: response => response.data,
    enabled: open,
  });

  if (writing === undefined) {
    return null;
  }

  return (
    <SidePeek.Root modal open={open} onOpenChange={onOpenChange} {...props}>
      {children}
      <SidePeek.Portal>
        {/* <SidePeek.Overlay /> */}
        <SidePeek.Content
          className={css({
            width: '400px',
            height: 'calc(100% - 100px)',
            marginRight: '6px',
          })}
        >
          <Flex direction="column" gap="16px" height="100%">
            <WritingInfo writing={writing} />
            <Separator className={css({ width: '100%' })} />
            <BookTable books={writing.books} />
          </Flex>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

WritingSidePeek.Trigger = SidePeek.Trigger;
