import { Avatar, Skeleton } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function OriginalWorkBasicInfoSkeleton() {
  return (
    <VStack alignItems="start" gap="20px" width="100%">
      <VStack position="relative" width="100%">
        <Avatar radius="full" src="" fallback="" size="9" />
      </VStack>
      <VStack alignItems="start" gap="8px">
        <Skeleton height="24px" width="200px" />
        <Skeleton height="22px" width="140px" />
        <Skeleton height="21px" width="100px" />
        <Skeleton height="21px" width="40px" />
      </VStack>
    </VStack>
  );
}
