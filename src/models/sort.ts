export enum SortType {
  Era = 'era',
  Education = 'education',
  MainInterest = 'main-interest',
  Nationality = 'nationality',
  Region = 'region',
  School = 'school',
  Author = 'author',
  Writing = 'writing',
}

export type SortDirection = 'asc' | 'desc';

export type Sort = { type: SortType; direction: SortDirection }[];
