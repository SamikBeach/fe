import { VStack } from 'styled-system/jsx';
import OriginalWorkItem from './OriginalWorkItem';

export default function OriginalWorkList() {
  return (
    <VStack pb="40px">
      <OriginalWorkItem />
      <OriginalWorkItem />
      <OriginalWorkItem />
      <OriginalWorkItem />
      <OriginalWorkItem />
      <OriginalWorkItem />
      <OriginalWorkItem />
    </VStack>
  );
}
