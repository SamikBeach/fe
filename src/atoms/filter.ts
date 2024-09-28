import { atom } from 'jotai';

export const authorFilterAtom = atom<{
  eraId: number | null;
}>({
  eraId: null,
});

export const originalWorkFilterAtom = atom<{ authorId: number | null }>({
  authorId: null,
});

export const editionFilterAtom = atom<{ authorId: number | null }>({
  authorId: null,
});
