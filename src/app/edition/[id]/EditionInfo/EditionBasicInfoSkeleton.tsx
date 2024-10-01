import { Skeleton } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function EditionBasicInfoSkeleton() {
  return (
    <VStack alignItems="start" gap="20px" width="100%">
      <VStack position="relative" width="100%">
        <Skeleton
          className={css({
            width: '140px',
            height: '200px',
            margin: '0 auto',
          })}
        />
      </VStack>
      <VStack alignItems="start" gap="6px">
        <Skeleton height="28px" width="200px" />
        <Skeleton height="22px" width="140px" />
        <Skeleton height="22px" width="100px" />
        <Skeleton height="28px" width="100px" />
        <Skeleton height="24px" width="140px" />
      </VStack>
    </VStack>
  );
}
