import { Skeleton } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';

export default function AuthorBasicInfoSkeleton() {
  return (
    <VStack alignItems="start" gap="8px" width="100%">
      <Skeleton height="24px" width="200px" />
      <Skeleton height="21px" width="160px" />
      <Skeleton height="21px" width="140px" />
    </VStack>
  );
}
