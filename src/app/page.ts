// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { isLoggedInAtom } from '@atoms/auth';
import { useAtomValue } from 'jotai';
import { redirect } from 'next/navigation';

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  if (isLoggedIn) {
    return 'home';
  }

  redirect('/login');
}
