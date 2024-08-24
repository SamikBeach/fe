import { AuthorServerModel } from '@models/author';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Skeleton, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function AuthorItemSkeleton() {
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
      _hover={{ scale: 1.02, bgColor: 'gray.50' }}
      transition="scale 0.1s ease-in-out"
    >
      <Avatar fallback="" radius="full" size="7" />
      <VStack alignItems="start" justify="space-between">
        <VStack alignItems="start" gap="4px">
          <Skeleton width="140px" height="16px" />
          <Skeleton width="160px" height="16px" />
          <Skeleton width="180px" height="16px" />
        </VStack>
        <Skeleton width="140px" height="16px" />
      </VStack>
    </HStack>
  );
}
