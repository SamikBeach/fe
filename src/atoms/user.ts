import { atom } from 'jotai';

export const userAtom = atom<{
  id: number;
  name: string;
  email: string;
} | null>(null);
