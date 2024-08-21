import { VStack } from 'styled-system/jsx';
import { EditionFilter } from './EditionFilter';
import { EditionList } from './EditionList';

export default function EditionsPage() {
  return (
    <VStack py="20px" gap="30px">
      <EditionFilter />
      <EditionList />
    </VStack>
  );
}
