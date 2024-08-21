import { HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';

export default function AuthorItem() {
  return (
    <HStack
      alignItems="start"
      gap="20px"
      border="1px solid"
      borderColor="gray.200"
      padding="16px"
      borderRadius="8px"
      maxWidth="386px"
    >
      <Avatar fallback="K" radius="full" size="7" />
      <VStack alignItems="start" gap="0">
        <Text size="3" weight="bold">
          Immanuel Kant
        </Text>
        <HStack>
          <Text size="2" color="gray">
            2021 Sepetember 9 - 2022 September 9
          </Text>
        </HStack>
        <HStack>
          <Text size="2">25 original works</Text>
          <Text size="2">330 books</Text>
        </HStack>
        <HStack gap="0">
          <Text size="2">351</Text>
          <HeartFilledIcon color="pink" width="24px" />
        </HStack>
      </VStack>
    </HStack>
  );
}
