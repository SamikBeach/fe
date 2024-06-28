import { SidePeek } from '@elements/SidePeek';
import { Flex, ScrollArea, Text } from '@radix-ui/themes';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { getBookById } from '@apis/book';
import { useQuery } from '@tanstack/react-query';
import { BookServerModel } from '@models/book';
import { HeartIcon } from '@radix-ui/react-icons';

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
            <BookInfo book={book} />
            <SellerLink />
          </Flex>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

function BookInfo({ book }: { book?: BookServerModel }) {
  return (
    <HStack gap="16px">
      <img
        src="data:image/jpeg;base64,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"
        height={140}
        width={100}
      />
      <VStack alignItems="start" gap="0px">
        <Text>도덕의 계보학</Text>
        <Text>번역: 홍길동</Text>
        <Text>출판사: 민음사</Text>
        <Text
          size="2"
          align="center"
          weight="bold"
          className={css({ cursor: 'pointer' })}
        >
          {book?.isbn}
        </Text>
        <HStack>
          <HStack gap="0">
            <Text>123</Text>
            <HeartIcon color="red" />
          </HStack>
          <Text>362 comments</Text>
        </HStack>
      </VStack>
    </HStack>
  );
}

function SellerLink() {
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      // className={css({ right: '-30px' })}
    >
      <VStack alignItems="flex-start" height="100%">
        구매 링크
      </VStack>
    </ScrollArea>
  );
}

BookSidePeek.Trigger = SidePeek.Trigger;
