import { atom } from 'jotai';

export const authorFilterAtom = atom<{
  eraId: number | null;
}>({
  eraId: null,
});
