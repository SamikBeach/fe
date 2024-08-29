import { Avatar, Skeleton } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function OriginalWorkItemSkeleton() {
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
      <Avatar fallback="" radius="large" size="7" />
      <VStack alignItems="start" gap="4px">
        <Skeleton width="140px" height="16px" />
        <Skeleton width="160px" height="16px" />
        <Skeleton width="60px" height="16px" />
        <Skeleton width="140px" height="16px" />
        <Skeleton width="160px" height="16px" />
      </VStack>
    </HStack>
  );
}
