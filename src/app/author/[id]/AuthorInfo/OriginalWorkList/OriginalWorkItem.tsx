import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function OriginalWorkItem() {
  return (
    <HStack
      gap="20px"
      bgColor="gray.100"
      padding="16px"
      borderRadius="8px"
      width="386px"
      height="124px"
      className={css({ cursor: 'pointer' })}
    >
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
        fallback="폴백"
        size="7"
      />
      <VStack alignItems="start" justify="space-between">
        <VStack alignItems="start" gap="0">
          <Text size="3" weight="bold">
            De catechizandis rudibus
          </Text>
          <Text size="2" color="gray">
            On Catechizing the Uninstructed
          </Text>
          <Text size="2" color="gray">
            25 editions
          </Text>
        </VStack>
        <HStack>
          <HStack gap="3px">
            <Text size="2" color="gray">
              351
            </Text>
            <HeartFilledIcon color="gray" />
          </HStack>
          <HStack gap="3px">
            <Text size="2" color="gray">
              12
            </Text>
            <ChatBubbleIcon color="gray" />
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
