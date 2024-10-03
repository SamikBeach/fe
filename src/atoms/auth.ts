import { atom } from 'jotai';

export const isLoggedInAtom = atom(false);

export const userAtom = atom({
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
});
