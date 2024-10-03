import { atom } from 'jotai';

export const currentUserAtom = atom<{
  id: number;
  name?: string;
  nickname?: string;
  email: string;
} | null>(null);

export const isLoggedInAtom = atom(
  get => get(currentUserAtom) != null,
  // currentUser를 set할 때 isLoggedInAtom(boolean)도 같이 set
  (_, set, newValue: boolean) => {
    if (newValue === false) {
      set(currentUserAtom, null);
    }
  }
);
