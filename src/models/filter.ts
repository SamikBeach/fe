import { SelectItem } from '@models/common';

export enum FilterType {
  Era = 'era',
  Education = 'education',
  MainInterest = 'main-interest',
  Nationality = 'nationality',
  Region = 'region',
  School = 'school',
  Author = 'author',
  Writing = 'writing',
}

export interface Filter {
  [FilterType.Era]: SelectItem[];
  [FilterType.Education]: SelectItem[];
  [FilterType.MainInterest]: SelectItem[];
  [FilterType.Nationality]: SelectItem[];
  [FilterType.Region]: SelectItem[];
  [FilterType.School]: SelectItem[];
  [FilterType.Author]: SelectItem[];
  [FilterType.Writing]: SelectItem[];
}
