import { atom } from 'jotai';

export type AuthorSort =
  | 'trending'
  | 'top_likes'
  | 'top_comments'
  | 'birth_date'
  | 'death_date'
  | 'alphabetical';

export const authorSortAtom = atom<AuthorSort>('trending');

export type OriginalWorkSort =
  | 'trending'
  | 'top_likes'
  | 'top_comments'
  | 'publication_date'
  | 'alphabetical';

export const originalWorkSortAtom = atom<OriginalWorkSort>('trending');
