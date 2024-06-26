import { SidePeek } from '@elements/SidePeek';
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';
import { getWritingById } from '@apis/writing';
import { useQuery } from '@tanstack/react-query';
import { WritingServerModel } from '@models/writing';
import { BookServerModel } from '@models/book';

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

  return (
    <SidePeek.Root modal open={open} onOpenChange={onOpenChange} {...props}>
      {children}
      <SidePeek.Portal>
        {/* <SidePeek.Overlay /> */}
        <SidePeek.Content
          className={css({
            width: '400px',
            height: 'calc(100% - 120px)',
            marginRight: '16px',
          })}
        >
          <Flex direction="column" gap="16px" height="100%">
            <WritingInfo writing={writing} />
            <BookInfo book={writing?.book} />
          </Flex>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

function WritingInfo({ writing }: { writing?: WritingServerModel }) {
  return (
    <Flex gap="16px" align="center">
      <img
        src="https://books.google.co.kr/books/publisher/content?id=fRa_CwAAQBAJ&pg=PP2&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U091j9O3JWw68P_eBYNUacwetb0EA&w=1280"
        height={140}
        width={100}
      />
      <Flex direction="column" gap="0px">
        <Text
          weight="bold"
          className={css({ fontWeight: 'bold', fontSize: '20px' })}
        >
          {writing?.title}
        </Text>
        <Text className={css({ fontSize: '14px', color: 'gray.500' })}>
          {writing?.publication_date}
        </Text>
      </Flex>
    </Flex>
  );
}

function BookInfo({ book }: { book?: BookServerModel[] }) {
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      // className={css({ right: '-30px' })}
    >
      <VStack alignItems="flex-start" height="100%">
        {book?.map(_book => (
          <Box
            height="160px"
            className={hstack({
              alignItems: 'flex-start',
            })}
          >
            <img
              src="https://books.google.co.kr/books/publisher/content?id=fRa_CwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2GbapWuQe_cyWPYJjV9CbjPrS2Qw&w=1280"
              className={css({ height: '100%', cursor: 'pointer' })}
            />
            <VStack alignItems="flex-start" gap="0">
              <Text
                size="2"
                align="center"
                weight="bold"
                className={css({ cursor: 'pointer' })}
              >
                {_book.isbn}
              </Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    </ScrollArea>
  );
}

WritingSidePeek.Trigger = SidePeek.Trigger;
