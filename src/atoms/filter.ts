import { Filter, FilterType } from '@components/AuthorFilterBox/Filter2/models';
import { atom } from 'jotai';

export const filterAtom = atom<Filter>({
  [FilterType.Era]: [],
  [FilterType.Education]: [],
  [FilterType.MainInterest]: [],
  [FilterType.Nationality]: [],
  [FilterType.Region]: [],
  [FilterType.School]: [],
});
