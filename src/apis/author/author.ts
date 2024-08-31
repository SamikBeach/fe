import api from '@apis/config';
import { AuthorServerModel, AuthorSort } from '@models/author';

type GetAllAuthorsResponse = AuthorServerModel[];

export function getAllAuthors() {
  return api.get<GetAllAuthorsResponse>('/author');
}

type GetAuthorByIdResponse = AuthorServerModel;

export function getAuthorById({ id }: { id: number }) {
  return api.get<GetAuthorByIdResponse>(`/author/${id}`);
}

interface SearchAuthorsRequest {
  where__name__i_like?: string;
  where__id__more_than?: number;
  order__name?: 'ASC' | 'DESC';
  take?: number;
  keyword?: string;
  eraId?: number | null;
  sort?: AuthorSort;
}

export interface SearchAuthorsResponse {
  cursor: {
    after: number | null;
  };
  count: number;
  next: string | null;
  data: AuthorServerModel[];
}

export function searchAuthors({
  take,
  where__name__i_like,
  where__id__more_than,
  order__name = 'ASC',
  keyword,
  eraId,
  sort,
}: SearchAuthorsRequest) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      where__name__i_like,
      where__id__more_than,
      order__name,
      take,
      keyword: keyword === '' ? undefined : keyword,
      eraId,
      sort,
    },
  });
}

type GetTrendingAuthorsResponse = AuthorServerModel[];

export function getTrendingAuthors() {
  return api.get<GetTrendingAuthorsResponse>('/author/trending');
}
