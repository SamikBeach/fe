import { BookServerModel } from '@models/book';
import { Dispatch, SetStateAction } from 'react';
import { BookSidePeek } from './BookSidePeek';
import { Box, ScrollArea, Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';
import { css } from 'styled-system/css';
import { HeartIcon } from '@radix-ui/react-icons';

interface Props {
  selectedBookId: number | null;
  setSelectedBookId: Dispatch<SetStateAction<number | null>>;
  books: BookServerModel[];
}

function BookInfo({ selectedBookId, setSelectedBookId, books }: Props) {
  return (
    <>
      <ScrollArea type="always" scrollbars="vertical">
        <VStack alignItems="flex-start" height="100%">
          {books.map(_book => (
            <Box
              height="160px"
              className={hstack({
                alignItems: 'flex-start',
              })}
            >
              <img
                src="https://image.yes24.com/momo/TopCate139/MidCate08/13872556.jpg"
                className={css({ height: '100%', cursor: 'pointer' })}
                onClick={() => setSelectedBookId(_book.id)}
              />
              <VStack alignItems="flex-start" gap="0">
                <Text>도덕의 계보학</Text>
                <Text>번역: 홍길동</Text>
                <Text>출판사: 민음사</Text>
                <Text
                  size="2"
                  align="center"
                  weight="bold"
                  className={css({ cursor: 'pointer' })}
                  onClick={() => setSelectedBookId(_book.id)}
                >
                  {_book.isbn}
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
      <BookSidePeek
        bookId={selectedBookId ?? 0}
        open={selectedBookId !== null}
        onOpenChange={open => setSelectedBookId(open ? selectedBookId : null)}
      />
    </>
  );
}

export default BookInfo;
