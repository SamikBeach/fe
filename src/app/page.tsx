// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { getAllAuthors } from '@apis/author';
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
    queryFn: getAllAuthors,
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
          data?.data.map(author => (
            <div key={author.id}>
              {author.id}: {author.name}
              {/* <img src={author.image_url} /> */}
            </div>
          ))}
      </>
    );
  }

  redirect('/login');
}
