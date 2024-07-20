import { SelectItem } from '@models/common';

export enum AuthorFilterType {
  Era = 'era',
  Education = 'education',
  MainInterest = 'main-interest',
  Nationality = 'nationality',
  Region = 'region',
  School = 'school',
}

export interface AuthorFilter {
  [AuthorFilterType.Era]: SelectItem[];
  [AuthorFilterType.Education]: SelectItem[];
  [AuthorFilterType.MainInterest]: SelectItem[];
  [AuthorFilterType.Nationality]: SelectItem[];
  [AuthorFilterType.Region]: SelectItem[];
  [AuthorFilterType.School]: SelectItem[];
}

export enum OriginalFilterType {
  Author = 'author',
}

export interface OriginalFilter {
  [OriginalFilterType.Author]: SelectItem[];
}
