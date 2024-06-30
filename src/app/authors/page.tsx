// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { AuthorRelationDiagram } from '@components/AuthorRelationDiagram';
import { css } from 'styled-system/css';
import AuthorList from './AuthorList';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from '@atoms/viewMode';

export default function AuthorsPage() {
  const viewMode = useAtomValue(viewModeAtom);

  return (
    <div className={css({ position: 'relative' })}>
      {viewMode === 'list' ? <AuthorList /> : <AuthorRelationDiagram />}
    </div>
  );
}
