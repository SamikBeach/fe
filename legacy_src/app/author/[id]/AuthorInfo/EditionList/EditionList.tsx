import { VStack } from 'styled-system/jsx';
import EditionItem from './EditionItem';

export default function OriginalWorkList() {
  return (
    <VStack pb="40px">
      <EditionItem />
      <EditionItem />
      <EditionItem />
      <EditionItem />
      <EditionItem />
      <EditionItem />
      <EditionItem />
    </VStack>
  );
}