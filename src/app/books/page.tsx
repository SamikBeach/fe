'use client';

import { BookFilterBox } from '@components/BookFilterBox';
import BookList from './BookList';

export default function Page() {
  return (
    <>
      <BookFilterBox />
      <BookList />
    </>
  );
}
