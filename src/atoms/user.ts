import { atom } from 'jotai';

export const currentUserAtom = atom<{
  id: number;
  name: string;
  email: string;
} | null>(null);
