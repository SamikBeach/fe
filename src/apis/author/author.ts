import { SearchResponse } from '@apis/common';
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
  keyword?: string;
  eraId: number | null;
  sort?: AuthorSort;
  page?: number;
}

export interface SearchAuthorsResponse
  extends SearchResponse<AuthorServerModel> {}

function getSortBy(sort?: AuthorSort) {
  switch (sort) {
    case 'top_likes':
      return 'like_count:DESC';
    case 'top_comments':
      return 'comment_count:DESC';
    case 'birth_date_youngest_first':
      return 'born_date:ASC';
    case 'birth_date_oldest_first':
      return 'born_date:DESC';
    case 'alphabetical':
      return 'name:ASC';
    default:
      return 'like_count:DESC';
  }
}

export function searchAuthors({
  page,
  keyword,
  eraId,
  sort,
}: SearchAuthorsRequest) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      search: keyword === '' ? undefined : keyword,
      ['filter.era_id']: eraId,
      sortBy: getSortBy(sort),
      page,
    },
  });
}

type GetTrendingAuthorsResponse = AuthorServerModel[];

export function getTrendingAuthors() {
  return api.get<GetTrendingAuthorsResponse>('/author/trending');
}
