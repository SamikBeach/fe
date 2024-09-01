import { AuthorSort } from '@models/author';
import { CommentSort } from '@models/comment';
import { OriginalWorkSort } from '@models/original-work';
import { atom } from 'jotai';

export const authorSortAtom = atom<AuthorSort>('top_likes');

export const originalWorkSortAtom = atom<OriginalWorkSort>('top_likes');

export const authorCommentSortAtom = atom<CommentSort>('top_likes');

export const originalWorkCommentSortAtom = atom<CommentSort>('top_likes');
