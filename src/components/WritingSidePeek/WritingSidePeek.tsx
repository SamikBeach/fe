import { SidePeek } from '@elements/SidePeek';
import { Cross1Icon } from '@radix-ui/react-icons';
import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  IconButton,
  Inset,
  ScrollArea,
  SegmentedControl,
  Separator,
  Text,
  Theme,
} from '@radix-ui/themes';
import { ComponentProps, ReactNode } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Button } from '@elements/Button';
import { hstack } from 'styled-system/patterns';

interface Props extends ComponentProps<typeof SidePeek.Root> {
  children?: ReactNode;
}

export default function WritingSidePeek({ children, ...props }: Props) {
  return (
    <SidePeek.Root modal {...props}>
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
            <AuthorInfo />
            <Separator orientation="horizontal" size="4" />
            <SegmentedControl.Root className={css({ width: '200px' })}>
              <SegmentedControl.Item value="writing">
                원전
              </SegmentedControl.Item>
              <SegmentedControl.Item value="translated-book">
                번역서
              </SegmentedControl.Item>
              <SegmentedControl.Item value="common-book">
                그 외
              </SegmentedControl.Item>
            </SegmentedControl.Root>
            <WritingInfo />
          </Flex>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

function AuthorInfo() {
  return (
    <Flex gap="16px" align="center">
      <Avatar
        src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcS3F15vW2p-W1vemKEkViypH0pjICfqHDzzuhC87bVXDYeysTmfYY9tD-M5-UyBr-Uo"
        fallback="니체"
        size="6"
      />
      <Flex direction="column" gap="0px">
        <Text
          weight="bold"
          className={css({ fontWeight: 'bold', fontSize: '20px' })}
        >
          Friedrich Nietzsche
        </Text>
        <Text className={css({ fontSize: '14px', color: 'gray.500' })}>
          1844.08.15 - 1900.08.25
        </Text>
        <Text className={css({ fontSize: '14px' })}>
          Friedrich Wilhelm Nietzsche[ii] (15 October 1844 – 25 August 1900) was
          a German philosopher. He began his career as a classical philologist
          before turning to philosophy.
        </Text>
      </Flex>
    </Flex>
  );
}

function WritingInfo() {
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      // className={css({ right: '-30px' })}
    >
      <VStack alignItems="flex-start" height="100%">
        <Box
          height="160px"
          className={hstack({
            alignItems: 'flex-start',
          })}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
            className={css({ height: '100%', cursor: 'pointer' })}
          />
          <VStack alignItems="flex-start" gap="0">
            <Text
              size="2"
              align="center"
              weight="bold"
              className={css({ cursor: 'pointer' })}
            >
              Also sprach Zarathustra
            </Text>
            <Text className={css({ fontSize: '14px' })}>
              Thus Spoke Zarathustra: A Book for All and None (German: Also
              sprach Zarathustra: Ein Buch für Alle und Keinen, also translated
              as Thus Spake Zarathustra) is a philosophical novel by German
              philosopher
            </Text>
          </VStack>
        </Box>
        <Box height="160px" className={hstack({ alignItems: 'flex-start' })}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Jenseits_von_Gut_und_B%C3%B6se_-_1886.jpg"
            className={css({ height: '100%' })}
          />
          <VStack alignItems="flex-start" gap="0">
            <Text size="2" align="center" weight="bold">
              Beyond Good and Evil
            </Text>
            <Text className={css({ fontSize: '14px' })}>
              Beyond Good and Evil: Prelude to a Philosophy of the Future
              (German: Jenseits von Gut und Böse: Vorspiel einer Philosophie der
              Zukunft) is a book by philosopher Friedrich Nietzsche that expands
              the ideas of his previous work, Thus Spoke Zarathustra, with a
              more critical and polemical approach.
            </Text>
          </VStack>
        </Box>
        <Box height="160px" className={hstack({ alignItems: 'flex-start' })}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Genealogie_der_Moral%2C_1887_-_cover.jpg"
            className={css({ height: '100%' })}
          />
          <VStack alignItems="flex-start" gap="0">
            <Text size="2" align="center" weight="bold">
              On the Genealogy of Morality
            </Text>
            <Text className={css({ fontSize: '14px' })}>
              On the Genealogy of Morality: A Polemic (German: Zur Genealogie
              der Moral: Eine Streitschrift) is an 1887 book by German
              philosopher
            </Text>
          </VStack>
        </Box>
        <Box height="160px" className={hstack({ alignItems: 'flex-start' })}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Genealogie_der_Moral%2C_1887_-_cover.jpg"
            className={css({ height: '100%' })}
          />
          <VStack alignItems="flex-start" gap="0">
            <Text size="2" align="center" weight="bold">
              On the Genealogy of Morality
            </Text>
            <Text className={css({ fontSize: '14px' })}>
              On the Genealogy of Morality: A Polemic (German: Zur Genealogie
              der Moral: Eine Streitschrift) is an 1887 book by German
              philosopher
            </Text>
          </VStack>
        </Box>
      </VStack>
    </ScrollArea>
  );
}

WritingSidePeek.Trigger = SidePeek.Trigger;
