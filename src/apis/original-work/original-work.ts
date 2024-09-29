import { SearchResponse } from '@apis/common';
import api from '@apis/config';
import {
  OriginalWorkServerModel,
  OriginalWorkSort,
} from '@models/original-work';

type GetAllOriginalWorksResponse = OriginalWorkServerModel[];

export function getAllOriginalWorks() {
  return api.get<GetAllOriginalWorksResponse>('/originalWork');
}

type GetOriginalWorkByIdResponse = OriginalWorkServerModel;

export function getOriginalWorkById({ id }: { id: number }) {
  return api.get<GetOriginalWorkByIdResponse>(`/original-work/${id}`);
}

interface SearchOriginalWorksRequest {
  keyword?: string;
  authorId?: number | null;
  editionId?: number | null;
  sort?: OriginalWorkSort;
  page?: number;
  limit?: number;
  locale?: string;
}

export interface SearchOriginalWorksResponse
  extends SearchResponse<OriginalWorkServerModel> {}

function getSortBy(sort: OriginalWorkSort | undefined, locale: string) {
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
      if (locale === 'ko') {
        return 'title_in_kor:ASC';
      }

      return 'title_in_eng:ASC';
    default:
      return 'like_count:DESC';
  }
}

export function searchOriginalWorks({
  page,
  keyword,
  authorId,
  editionId,
  sort,
  limit,
  locale = 'en',
}: SearchOriginalWorksRequest) {
  return api.get<SearchOriginalWorksResponse>('/original-work/search', {
    params: {
      search: keyword === '' ? undefined : keyword,
      ['filter.author_id']: authorId,
      ['filter.edition_id']: editionId,
      sortBy: getSortBy(sort, locale),
      page,
      limit,
    },
  });
}
type GetTrendingOriginalWorksResponse = OriginalWorkServerModel[];

export function getTrendingOriginalWorks() {
  return api.get<GetTrendingOriginalWorksResponse>('/original-work/trending');
}
