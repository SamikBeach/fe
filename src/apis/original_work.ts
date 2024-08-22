import api from '@apis/config';
import { OriginalWorkServerModel } from '@models/original_work';

type GetAllOriginalWorksResponse = OriginalWorkServerModel[];

export function getAllOriginalWorks() {
  return api.get<GetAllOriginalWorksResponse>('/originalWork');
}

type GetOriginalWorkByIdResponse = OriginalWorkServerModel;

export function getOriginalWorkById({ id }: { id: number }) {
  return api.get<GetOriginalWorkByIdResponse>(`/originalWork/${id}`);
}

interface SearchOriginalWorksRequest {
  where__title__i_like?: string;
  where__id__more_than?: number;
  take?: number;
  keyword?: string;
}

export interface SearchOriginalWorksResponse {
  cursor: {
    after: number | null;
  };
  coont: number;
  next: string | null;
  data: OriginalWorkServerModel[];
}

export function searchOriginalWorks({
  where__title__i_like,
  where__id__more_than,
  take,
  keyword,
}: SearchOriginalWorksRequest) {
  return api.get<SearchOriginalWorksResponse>('/originalWork/search', {
    params: {
      where__title__i_like,
      where__id__more_than,
      take,
      keyword: keyword === '' || keyword === undefined ? undefined : keyword,
    },
  });
}
