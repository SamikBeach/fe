import { VStack } from 'styled-system/jsx';
import { AuthorFilterBox } from './AuthorFilterBox';
import { AuthorList } from './AuthorList';

export default function AuthorsPage() {
  return (
    <VStack py="20px" gap="30px">
      <AuthorFilterBox />
      <AuthorList />
    </VStack>
  );
}
