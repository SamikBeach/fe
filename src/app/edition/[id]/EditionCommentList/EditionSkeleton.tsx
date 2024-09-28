import { Avatar, Skeleton } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  height: string;
}

export default function EditionCommentItemSkeleton({ height }: Props) {
  return (
    <HStack alignItems="start" width="100%" justify="end">
      <Avatar fallback="" radius="full" size="2" mt="4px" />
      <VStack gap="4px" alignItems="start">
        <Skeleton height={height} width="678px" />
        <HStack justify="space-between" width="100%">
          <HStack ml="8px">
            <Skeleton width="30px" height="14px" />
            <Skeleton width="30px" height="14px" />
          </HStack>
          <HStack mr="8px">
            <Skeleton width="40px" height="14px" />
            <Skeleton width="100px" height="14px" />
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
