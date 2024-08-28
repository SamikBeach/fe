import { Avatar, Skeleton } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function AuthorBasicInfoSkeleton() {
  return (
    <VStack alignItems="start" gap="20px" width="100%">
      <VStack position="relative" width="100%">
        <Avatar
          radius="full"
          src=""
          fallback=""
          size="9"
          className={css({
            width: '260px',
            height: '260px',
            margin: '0 auto',
          })}
        />
      </VStack>
      <VStack alignItems="start" gap="8px">
        <Skeleton height="24px" width="200px" />
        <Skeleton height="21px" width="140px" />
        <Skeleton height="21px" width="40px" />
      </VStack>
    </VStack>
  );
}
