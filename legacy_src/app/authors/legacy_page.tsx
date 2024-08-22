// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { AuthorRelationDiagram } from 'legacy_src/components/AuthorRelationDiagram';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from 'legacy_src/atoms/viewMode';
import { HStack, VStack } from 'styled-system/jsx';
import { AuthorFilterBox } from 'legacy_src/components/AuthorFilterBox';
import { AuthorTable } from 'legacy_src/components/AuthorTable';
import { css } from 'styled-system/css';

export default function AuthorsPage() {
  const viewMode = useAtomValue(viewModeAtom);

  return (
    <HStack gap="0px" height="calc(100vh - 64px)" alignItems="start">
      <VStack
        width="300px"
        height="100%"
        className={css({
          boxShadow: '1px 0 0 rgba(0, 0, 0, 0.05)',
        })}
      >
        <AuthorFilterBox />
      </VStack>
      <HStack width="calc(100vw - 300px)">
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
