import api from '@apis/config';
import { BookServerModel } from '@models/book';
import { Filter, FilterType } from '@models/filter';

type GetAllBooksResponse = BookServerModel[];

export function getAllBooks() {
  return api.get<GetAllBooksResponse>('/book');
}

type GetBookByIdResponse = BookServerModel;

export function getBookById({ id }: { id: number }) {
  return api.get<GetBookByIdResponse>(`/book/${id}`);
}

interface SearchBooksRequest extends Partial<Filter> {
  where__title__i_like?: string;
  where__id__more_than?: number;
  take?: number;
  authorIds?: number[];
  writingIds?: number[];
}

export type SearchBooksResponse = {
  cursor: {
    after: number | null;
  };
  coont: number;
  next: string | null;
  data: BookServerModel[];
};

export function searchBooks({
  where__title__i_like,
  where__id__more_than,
  take,
  authorIds,
  writingIds,
  ...filter
}: SearchBooksRequest) {
  // TODO: author/authorIds, writing/writingsIds 하나로 통일
  const hasAuthorIds = authorIds !== undefined && authorIds.length > 0;
  const hasWritingIds = writingIds !== undefined && writingIds.length > 0;

  return api.get<SearchBooksResponse>('/book/search', {
    params: {
      where__title__i_like,
      where__id__more_than,
      take,
      authorIds: hasAuthorIds
        ? authorIds
        : filter[FilterType.Author]?.map(item => item.id),
      writingIds: hasWritingIds
        ? writingIds
        : filter[FilterType.Writing]?.map(item => item.id),
    },
  });
}
