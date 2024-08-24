import { atom } from 'jotai';

export type Sort =
  | 'trending'
  | 'top_likes'
  | 'top_comments'
  | 'birth_date'
  | 'death_date'
  | 'alphabetical';

export const authorSortAtom = atom<Sort>('trending');
