import { BookServerModel } from '@models/book';
import { HeartIcon } from '@radix-ui/react-icons';
import { Box, ScrollArea, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';

interface Props {
  books: BookServerModel[];
}

function BookInfo({ books }: Props) {
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      // className={css({ right: '-30px' })}
    >
      <VStack alignItems="flex-start" height="100%">
        {books.map(_book => (
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

export default BookInfo;
