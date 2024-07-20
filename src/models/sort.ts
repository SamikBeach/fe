export enum SortType {
  Name = 'name',
  Nationality = 'nationality',
  Era = 'era',
  Region = 'region',
  Education = 'education',
  MainInterest = 'main-interest',
  School = 'school',
  BornDate = 'born_date',
  DiedDate = 'died_date',
  // Author = 'author',
  // Writing = 'writing',
}

export type SortDirection = 'asc' | 'desc';

export type Sort = { type: SortType; direction: SortDirection }[];
