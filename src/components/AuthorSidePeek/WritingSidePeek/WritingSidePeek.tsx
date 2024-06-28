import { SidePeek } from '@elements/SidePeek';
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';
import { getWritingById } from '@apis/writing';
import { useQuery } from '@tanstack/react-query';
import { WritingServerModel } from '@models/writing';
import { BookServerModel } from '@models/book';
import { AuthorAvatar } from '@components/AuthorAvatar';
import { HeartIcon } from '@radix-ui/react-icons';

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
    <HStack gap="16px" alignItems="start">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
        height={140}
        width={100}
      />
      <VStack alignItems="start" gap="0px">
        <Text
          weight="bold"
          className={css({ fontWeight: 'bold', fontSize: '20px' })}
        >
          {writing?.title}
        </Text>
        <Text className={css({ fontSize: '14px', color: 'gray.500' })}>
          {writing?.publication_date}
        </Text>
        <HStack>
          <AuthorAvatar
            author={{
              id: 1,
              name: 'Friedrich Nietzsche',
              name_in_kor: '프리드리히 니체',
              born_date: '1844-10-15',
              born_date_is_bc: null,
              died_date: '1900-08-25',
              died_date_is_bc: null,
              image_url:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/472px-Nietzsche187a.jpg',
              influenced: [],
              influenced_by: [],
              writing: [],
              book: [],
            }}
          />
          <Text size="4">{writing?.author.name}</Text>
        </HStack>
        <Text>{writing?.book.length} books</Text>
        <Text size="2" color="gray">
          Ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur.
        </Text>
      </VStack>
    </HStack>
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
                {_book?.isbn}
              </Text>
              <HStack>
                <HStack gap="0">
                  <Text>123</Text>
                  <HeartIcon color="red" />
                </HStack>
                <Text>362 comments</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </ScrollArea>
  );
}

WritingSidePeek.Trigger = SidePeek.Trigger;
