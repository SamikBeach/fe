'use client';

import { FilterBox } from '@components/FilterBox';
import BookList from './BookList';
import { css } from 'styled-system/css';

export default function Page() {
  return (
    <>
      <FilterBox
        className={css({
          position: 'relative !important',
        })}
        showViewModeSelect={false}
      />
      <BookList />
    </>
  );
}
