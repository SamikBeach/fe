import { atom } from 'jotai';

export const viewModeAtom = atom<'diagram' | 'list'>('diagram');
