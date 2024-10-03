import { atom } from 'jotai';

export const currentUserAtom = atom<{
  id: number;
  name?: string;
  nickname?: string;
  email: string;
} | null>(null);
