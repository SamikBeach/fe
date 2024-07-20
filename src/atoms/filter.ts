import { Filter, FilterType } from '@models/filter';
import { atom } from 'jotai';

export const filterAtom = atom<Filter>({
  [FilterType.Era]: [],
  [FilterType.Education]: [],
  [FilterType.MainInterest]: [],
  [FilterType.Nationality]: [],
  [FilterType.Region]: [],
  [FilterType.School]: [],
  [FilterType.Author]: [],
  [FilterType.Writing]: [],
});
