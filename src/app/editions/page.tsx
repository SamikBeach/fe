import { VStack } from 'styled-system/jsx';
import { EditionList } from './EditionList';
import { EditionFilterBox } from './EditionFilterBox';

export default function EditionsPage() {
  return (
    <VStack py="20px" gap="30px">
      <EditionFilterBox />
      <EditionList />
    </VStack>
  );
}
