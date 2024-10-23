import { Skeleton } from '@radix-ui/themes';
import { VStack, VstackProps } from 'styled-system/jsx';

interface Props extends VstackProps {}

export default function OriginalWorkBasicInfoSectionSkeleton(props: Props) {
  return (
    <VStack alignItems="start" gap="6px" width="100%" px="10px" {...props}>
      <Skeleton height="28px" width="200px" />
      <Skeleton height="22px" width="140px" />
      <Skeleton height="22px" width="140px" />
      <Skeleton height="22px" width="60px" />
      <Skeleton height="28px" width="100px" />
    </VStack>
  );
}
