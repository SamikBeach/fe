import { VStack } from 'styled-system/jsx';
import { OriginalWorkList } from './OriginalWorkList';
import { OriginalWorkFilterBox } from './OriginalWorkFilterBox';

export default function OriginalWorksPage() {
  return (
    <VStack py="20px" gap="30px">
      <OriginalWorkFilterBox />
      <OriginalWorkList />
    </VStack>
  );
}
