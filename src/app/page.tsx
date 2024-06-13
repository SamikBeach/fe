// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { getAllBooks } from '@apis/book';
import { isLoggedInAtom } from '@atoms/auth';
import { Button } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [isShownBooks, setIsShownBooks] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const { data } = useQuery({
    queryKey: ['book'],
    queryFn: getAllBooks,
    enabled: isShownBooks,
    staleTime: 0,
  });

  if (isLoggedIn) {
    return (
      <>
        <Button onClick={() => setIsShownBooks(prev => !prev)}>
          toggle getAllBooks
        </Button>
        {isShownBooks &&
          data?.data
            .slice(0, 10)
            .map(book => <div key={book.id}>{book.isbn}</div>)}
      </>
    );
  }

  redirect('/login');
}
