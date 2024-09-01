import { AuthorSort } from '@models/author';
import { OriginalWorkSort } from '@models/original-work';
import { atom } from 'jotai';

export const authorSortAtom = atom<AuthorSort>('top_likes');

export const originalWorkSortAtom = atom<OriginalWorkSort>('top_likes');
