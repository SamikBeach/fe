// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { AuthorRelationDiagram } from '@components/AuthorRelationDiagram';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from '@atoms/viewMode';
import { HStack, VStack } from 'styled-system/jsx';
import { AuthorFilterBox } from '@components/AuthorFilterBox';
import { AuthorTable } from '@components/AuthorTable';

export default function AuthorsPage() {
  const viewMode = useAtomValue(viewModeAtom);

  return (
    <HStack gap="0px" height="100%" alignItems="start">
      <VStack width="400px" height="100%">
        <AuthorFilterBox />
      </VStack>
      <HStack width="calc(100vw - 400px)">
        {viewMode === 'list' ? (
          <>
            <AuthorTable />
          </>
        ) : (
          <AuthorRelationDiagram />
        )}
      </HStack>
    </HStack>
  );
}
