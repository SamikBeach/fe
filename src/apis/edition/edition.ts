import { SearchResponse } from '@apis/common';
import api from '@apis/config';
import { EditionServerModel, EditionSort } from '@models/edition';

type GetAllEditionsResponse = EditionServerModel[];

export function getAllEditions() {
  return api.get<GetAllEditionsResponse>('/edition');
}

type GetEditionByIdResponse = EditionServerModel;

export function getEditionById({ id }: { id: number }) {
  return api.get<GetEditionByIdResponse>(`/edition/${id}`);
}

interface SearchEditionsRequest {
  keyword?: string;
  authorId?: number | null;
  sort?: EditionSort;
  page?: number;
  limit?: number;
}

export interface SearchEditionsResponse
  extends SearchResponse<EditionServerModel> {}

function getSortBy(sort?: EditionSort) {
  switch (sort) {
    case 'top_likes':
      return 'like_count:DESC';
    case 'top_comments':
      return 'comment_count:DESC';
    case 'publication_date_newest_first':
      return 'publication_date:DESC';
    case 'publication_date_oldest_first':
      return 'publication_date:ASC';
    case 'alphabetical':
      return 'title:ASC';
    default:
      return 'like_count:DESC';
  }
}

export function searchEditions({
  page,
  keyword,
  authorId,
  sort,
  limit,
}: SearchEditionsRequest) {
  return api.get<SearchEditionsResponse>('/edition/search', {
    params: {
      search: keyword === '' ? undefined : keyword,
      ['filter.author_id']: authorId,
      sortBy: getSortBy(sort),
      page,
      limit,
    },
  });
}
type GetTrendingEditionsResponse = EditionServerModel[];

export function getTrendingEditions() {
  return api.get<GetTrendingEditionsResponse>('/edition/trending');
}
