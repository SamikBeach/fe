import { WritingServerModel } from '@models/writing';
import { Dispatch, SetStateAction } from 'react';
import { Box, ScrollArea, Text } from '@radix-ui/themes';
import { hstack } from 'styled-system/patterns';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { HeartIcon } from '@radix-ui/react-icons';
import { WritingSidePeek } from './WritingSidePeek';

interface WritingInfoProps {
  selectedWritingId: number | null;
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
  writings: WritingServerModel[];
}

function WritingInfo({
  selectedWritingId,
  setSelectedWritingId,
  writings,
}: WritingInfoProps) {
  return (
    <>
      <ScrollArea type="always" scrollbars="vertical">
        <VStack alignItems="flex-start" height="100%">
          {writings.map(writing => (
            <Box
              height="160px"
              className={hstack({
                alignItems: 'flex-start',
              })}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
                className={css({ height: '100%', cursor: 'pointer' })}
                onClick={() => setSelectedWritingId(writing.id)}
              />
              <VStack alignItems="flex-start" gap="0">
                <HStack>
                  <Text
                    size="2"
                    align="center"
                    weight="bold"
                    className={css({ cursor: 'pointer' })}
                    onClick={() => setSelectedWritingId(writing.id)}
                  >
                    {writing.title}
                  </Text>
                  <HStack>
                    <HStack gap="0">
                      <Text>123</Text>
                      <HeartIcon color="red" />
                    </HStack>
                    <Text>362 comments</Text>
                  </HStack>
                </HStack>
                <Text>영문 타이틀:{writing.title_in_eng}</Text>
                <Text>국문 타이틀:{writing.title_in_kor}</Text>
                <Text className={css({ fontSize: '14px' })}>
                  {writing.publication_date} 년
                </Text>
                <Text size="2" color="gray">
                  Ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  consectetur.
                </Text>
                <Text>{writing.books.length} books</Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      </ScrollArea>
      <WritingSidePeek
        writingId={selectedWritingId ?? 0}
        open={selectedWritingId !== null}
        onOpenChange={open =>
          setSelectedWritingId(open ? selectedWritingId : null)
        }
      />
    </>
  );
}

export default WritingInfo;
