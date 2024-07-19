import { AuthorFilterBox } from '@components/AuthorFilterBox';
import { AuthorTable } from '@components/AuthorTable';
import { HStack } from 'styled-system/jsx';

function AuthorList() {
  return (
    <HStack>
      <HStack width="400px">
        <AuthorFilterBox />
      </HStack>
      <HStack width="calc(100vw - 400px)">
        <AuthorTable />
      </HStack>
    </HStack>
  );
}

export default AuthorList;
