import { Skeleton } from '@radix-ui/themes';
import { VStack, VstackProps } from 'styled-system/jsx';

interface Props extends VstackProps {}

export default function EditionBasicInfoSectionSkeleton(props: Props) {
  return (
    <VStack alignItems="start" gap="6px" px="10px" {...props}>
      <Skeleton height="28px" width="200px" />
      <Skeleton height="22px" width="140px" />
      <Skeleton height="22px" width="100px" />
      <Skeleton height="28px" width="100px" />
      <Skeleton height="20px" width="140px" />
    </VStack>
  );
}
