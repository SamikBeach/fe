// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { AuthorRelationDiagram } from '@components/AuthorRelationDiagram';
import AuthorList from './AuthorList';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from '@atoms/viewMode';
import { AuthorFilterBox } from '@components/AuthorFilterBox';

export default function AuthorsPage() {
  const viewMode = useAtomValue(viewModeAtom);

  return viewMode === 'list' ? (
    <>
      <AuthorFilterBox />
      <AuthorList />
    </>
  ) : (
    <AuthorRelationDiagram />
  );
}
