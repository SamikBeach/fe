import { VStack } from 'styled-system/jsx';
import { OriginalWorkList } from './OriginalWorkList';
import { OriginalWorkFilter } from './OriginalWorkFilter';

export default function AuthorsPage() {
  return (
    <VStack py="20px" gap="30px">
      <OriginalWorkFilter />
      <OriginalWorkList />
    </VStack>
  );
}