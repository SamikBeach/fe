// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { AuthorRelationDiagram } from '@components/AuthorRelationDiagram';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from '@atoms/viewMode';
import { HStack, VStack } from 'styled-system/jsx';
import { AuthorFilterBox } from '@components/AuthorFilterBox';
import { AuthorTable } from '@components/AuthorTable';
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
