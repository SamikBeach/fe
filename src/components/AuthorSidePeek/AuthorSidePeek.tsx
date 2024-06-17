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
} from '@radix-ui/themes';
import { ComponentProps, ReactNode, useState } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Button } from '@elements/Button';
import { hstack } from 'styled-system/patterns';
import { WritingSidePeek } from '@components/WritingSidePeek';

interface Props extends ComponentProps<typeof SidePeek.Root> {
  children: ReactNode;
}

export default function AuthorSidePeek({ children, ...props }: Props) {
  const [isOpenWritingSidePeek, setIsOpenWritingSidePeek] = useState(false);

  return (
    <SidePeek.Root modal={false} {...props}>
      {children}
      <SidePeek.Portal>
        <SidePeek.Content
          className={css({
            width: '800px',
            height: 'calc(100vh - 64px - 24px)',
          })}
        >
          {isOpenWritingSidePeek && (
            <div
              className={css({
                background: 'rgba(0 0 0 / 0.2)',
                position: 'fixed',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '12px',
              })}
            />
          )}
          <Flex direction="column" gap="16px" height="100%">
            <AuthorInfo />
            <Separator orientation="horizontal" size="4" />
            <SegmentedControl.Root size="3" className={css({ width: '200px' })}>
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
            <WritingInfo
              isOpenWritingSidePeek={isOpenWritingSidePeek}
              setIsOpenWritingSidePeek={setIsOpenWritingSidePeek}
            />
          </Flex>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

function AuthorInfo() {
  return (
    <HStack gap="16px">
      <Avatar
        src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcS3F15vW2p-W1vemKEkViypH0pjICfqHDzzuhC87bVXDYeysTmfYY9tD-M5-UyBr-Uo"
        fallback="니체"
        size="9"
        radius="full"
      />
      <VStack alignItems="start" gap="0px">
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
        <HStack gap="20px">
          <VStack alignItems="start" gap="0">
            <Text>Influenced By</Text>
            <HStack gap="2px">
              <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg"
                fallback="칸트"
              />
              <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg"
                fallback="칸트"
              />
              <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg"
                fallback="칸트"
              />
            </HStack>
          </VStack>
          <VStack alignItems="start" gap="0">
            <Text>Influenced To</Text>
            <HStack gap="2px">
              {/* HoverCard 쓰기 */}
              <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg"
                fallback="칸트"
              />
              <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg"
                fallback="칸트"
              />
              <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg"
                fallback="칸트"
              />
            </HStack>
          </VStack>
          <VStack alignItems="start" gap="0">
            <Text>Main Interests</Text>
            <HStack gap="2px">
              <Text>Physics</Text>
              <Text>Phychology</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

interface WritingInfoProps {
  isOpenWritingSidePeek: boolean;
  setIsOpenWritingSidePeek: (open: boolean) => void;
}

function WritingInfo({
  isOpenWritingSidePeek,
  setIsOpenWritingSidePeek,
}: WritingInfoProps) {
  return (
    <>
      <ScrollArea type="always" scrollbars="vertical">
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
              onClick={() => setIsOpenWritingSidePeek(true)}
            />
            <VStack alignItems="flex-start" gap="0">
              <Text
                size="2"
                align="center"
                weight="bold"
                className={css({ cursor: 'pointer' })}
                onClick={() => setIsOpenWritingSidePeek(true)}
              >
                Also sprach Zarathustra
              </Text>
              <Text className={css({ fontSize: '14px' })}>
                Thus Spoke Zarathustra: A Book for All and None (German: Also
                sprach Zarathustra: Ein Buch für Alle und Keinen, also
                translated as Thus Spake Zarathustra) is a philosophical novel
                by German philosopher
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
                (German: Jenseits von Gut und Böse: Vorspiel einer Philosophie
                der Zukunft) is a book by philosopher Friedrich Nietzsche that
                expands the ideas of his previous work, Thus Spoke Zarathustra,
                with a more critical and polemical approach.
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
      <WritingSidePeek
        open={isOpenWritingSidePeek}
        onOpenChange={setIsOpenWritingSidePeek}
      />
    </>
  );
}

AuthorSidePeek.Trigger = SidePeek.Trigger;
