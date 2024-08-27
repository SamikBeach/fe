import api from '@apis/config';
import { OriginalWorkSort } from '@atoms/sort';
import { OriginalWorkServerModel } from '@models/original-work';

type GetAllOriginalWorksResponse = OriginalWorkServerModel[];

export function getAllOriginalWorks() {
  return api.get<GetAllOriginalWorksResponse>('/originalWork');
}

type GetOriginalWorkByIdResponse = OriginalWorkServerModel;

export function getOriginalWorkById({ id }: { id: number }) {
  return api.get<GetOriginalWorkByIdResponse>(`/original-work/${id}`);
}

interface SearchOriginalWorksRequest {
  where__title__i_like?: string;
  where__id__more_than?: number;
  authorId?: number | null;
  take?: number;
  sort?: OriginalWorkSort;
  keyword?: string;
}

export interface SearchOriginalWorksResponse {
  cursor: {
    after: number | null;
  };
  count: number;
  next: string | null;
  data: OriginalWorkServerModel[];
}

export function searchOriginalWorks({
  where__title__i_like,
  where__id__more_than,
  take,
  sort,
  authorId,
  keyword,
}: SearchOriginalWorksRequest) {
  return api.get<SearchOriginalWorksResponse>('/original-work/search', {
    params: {
      where__title__i_like,
      where__id__more_than,
      take,
      sort,
      authorId,
      keyword: keyword === '' || keyword === undefined ? undefined : keyword,
    },
  });
}
