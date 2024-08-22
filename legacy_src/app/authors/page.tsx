import { VStack } from 'styled-system/jsx';
import { AuthorFilter } from './AuthorFilter';
import { AuthorList } from './AuthorList';

export default function AuthorsPage() {
  return (
    <VStack py="20px" gap="30px">
      <AuthorFilter />
      <AuthorList />
    </VStack>
  );
}
