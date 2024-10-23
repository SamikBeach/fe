import { Skeleton } from '@radix-ui/themes';
import { VStack, VstackProps } from 'styled-system/jsx';

interface Props extends VstackProps {}

export default function AuthorBasicInfoSkeleton(props: Props) {
  return (
    <VStack alignItems="start" gap="8px" width="100%" px="10px" {...props}>
      <Skeleton height="24px" width="200px" />
      <Skeleton height="21px" width="160px" />
      <Skeleton height="21px" width="140px" />
    </VStack>
  );
}
