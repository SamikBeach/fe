import { SortType } from '@models/sort';

export const columnHeaderNameMap: Record<string, string> = {
  // TODO: 컬럼 헤더 이넘 정의
  [SortType.Title]: 'Title',
  [SortType.TitleInKor]: 'Korean title',
  [SortType.Author]: 'Author',
  [SortType.PublicationDate]: 'Publication date',
};
