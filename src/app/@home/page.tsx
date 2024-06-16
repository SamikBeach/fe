// TODO: use client 제거하고 서버 컴포넌트로
'use client';

import { getAllAuthors } from '@apis/author';
import { getAllBooks } from '@apis/book';
import { isLoggedInAtom } from '@atoms/auth';
import { Drawer } from '@elements/Drawer';

import { Button } from '@elements/Button';
import { Avatar, IconButton } from '@radix-ui/themes';

import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { redirect } from 'next/navigation';
import { useState } from 'react';

import { css } from 'styled-system/css';
import { RelationDiagram } from '@components/RelationDiagram';
import { SidePeek } from '@elements/SidePeek';

export default function Home() {
  const [isShownBooks, setIsShownBooks] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const { data } = useQuery({
    queryKey: ['book'],
    queryFn: getAllAuthors,
    enabled: isShownBooks,
    staleTime: 0,
  });

  // if (isLoggedIn) {
  return (
    <>
      {/* <Button onClick={() => setIsShownBooks(prev => !prev)}>
        toggle getAllBooks
      </Button>
      <Button onClick={() => setIsOpenDrawer(prev => !prev)}>openDrawer</Button>
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/472px-Nietzsche187a.jpg"
        fallback="니"
        size="5"
        className={css({
          cursor: 'pointer',
          _hover: {
            opacity: 0.8,
          },
        })}
        onClick={() => setIsOpenDrawer(true)}
      /> */}
      {/* <Drawer
        direction="right"
        size="40%"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <div>drawer</div>
        <Button>this is a button</Button>
      </Drawer> */}

      <RelationDiagram />

      {isShownBooks &&
        data?.data.map(author => (
          <div key={author.id}>
            {author.id}: {author.name}
            {/* <img src={author.image_url} /> */}
          </div>
        ))}
    </>
  );
  // }

  // redirect('/login');
}
