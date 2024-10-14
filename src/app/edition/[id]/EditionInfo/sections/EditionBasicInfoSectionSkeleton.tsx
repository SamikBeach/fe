import { Skeleton } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';

export default function EditionBasicInfoSectionSkeleton() {
  return (
    <VStack alignItems="start" gap="6px">
      <Skeleton height="28px" width="200px" />
      <Skeleton height="22px" width="140px" />
      <Skeleton height="22px" width="100px" />
      <Skeleton height="28px" width="100px" />
      <Skeleton height="24px" width="140px" />
    </VStack>
  );
}
