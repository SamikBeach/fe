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
  eraId?: number | null;
  sort?: AuthorSort;
  page?: number;
  limit?: number;
  locale?: string;
}

export interface SearchAuthorsResponse
  extends SearchResponse<AuthorServerModel> {}

function getSortBy(sort: AuthorSort | undefined, locale: string) {
  switch (sort) {
    case 'top_likes':
      return 'like_count:DESC';
    case 'top_comments':
      return 'comment_count:DESC';
    case 'top_original_works':
      return 'original_work_count:DESC';
    case 'top_editions':
      return 'edition_count:DESC';
    case 'birth_date_youngest_first':
      return 'born_date:ASC';
    case 'birth_date_oldest_first':
      return 'born_date:DESC';
    case 'alphabetical':
      if (locale === 'ko') {
        return 'name_in_kor:ASC';
      }

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
  limit,
  locale = 'en',
}: SearchAuthorsRequest) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      search: keyword === '' ? undefined : keyword,
      ['filter.era_id']: eraId,
      sortBy: getSortBy(sort, locale),
      page,
      limit,
    },
  });
}

type GetTrendingAuthorsResponse = AuthorServerModel[];

export function getTrendingAuthors() {
  return api.get<GetTrendingAuthorsResponse>('/author/trending');
}
