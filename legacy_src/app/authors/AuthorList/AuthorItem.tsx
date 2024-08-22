import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function AuthorItem() {
  return (
    <HStack
      gap="20px"
      border="1px solid"
      borderColor="gray.200"
      padding="16px"
      borderRadius="8px"
      width="386px"
      height="130px"
      className={css({ cursor: 'pointer' })}
    >
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg"
        fallback="K"
        radius="full"
        size="7"
      />
      <VStack alignItems="start" justify="space-between">
        <VStack alignItems="start" gap="0">
          <Text size="3" weight="bold">
            Immanuel Kant
          </Text>
          <HStack>
            <Text size="2" color="gray">
              2021 April 9 - 2022 September 9
            </Text>
          </HStack>
          <HStack>
            <Text size="2" color="gray">
              25 original works
            </Text>
            <Text size="2" color="gray">
              330 books
            </Text>
          </HStack>
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
