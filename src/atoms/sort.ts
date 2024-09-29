import { AuthorSort } from '@models/author';
import { CommentSort } from '@models/comment';
import { OriginalWorkSort } from '@models/original-work';
import { EditionSort } from '@models/edition';
import { atom } from 'jotai';

export const authorSortAtom = atom<AuthorSort>('top_likes');

export const originalWorkSortAtom = atom<OriginalWorkSort>('top_likes');

export const editionSortAtom = atom<EditionSort>('top_likes');

export const authorCommentSortAtom = atom<CommentSort>('top_likes');

export const originalWorkCommentSortAtom = atom<CommentSort>('top_likes');

export const editionCommentSortAtom = atom<CommentSort>('top_likes');

export const authorOriginalWorkSortAtom = atom<OriginalWorkSort>('top_likes');

export const authorEditionSortAtom = atom<EditionSort>('top_likes');

export const originalWorkEditionSortAtom = atom<EditionSort>('top_likes');
