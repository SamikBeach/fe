import { SortType } from '@models/sort';

export const columnHeaderNameMap: Record<string, string> = {
  // TODO: 컬럼 헤더 이넘 정의
  [SortType.Name]: 'Name',
  [SortType.Nationality]: 'Nationality',
  [SortType.Era]: 'Era',
  [SortType.Region]: 'Region',
  [SortType.Education]: 'Education',
  [SortType.MainInterest]: 'Main Interest',
  [SortType.School]: 'School',
  [SortType.BornDate]: 'Born date',
  [SortType.DiedDate]: 'Died date',
};
