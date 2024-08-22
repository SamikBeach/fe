import api from 'legacy_src/apis/config';
import { Filter, FilterType } from 'legacy_src/models/filter';
import { Sort } from 'legacy_src/models/sort';
import { WritingServerModel } from 'legacy_src/models/writing';

type GetAllWritingsResponse = WritingServerModel[];

export function getAllWritings() {
  return api.get<GetAllWritingsResponse>('/writing');
}

type GetWritingByIdResponse = WritingServerModel;

export function getWritingById({ id }: { id: number }) {
  return api.get<GetWritingByIdResponse>(`/writing/${id}`);
}

interface SearchWritingsRequest extends Partial<Filter> {
  where__title__i_like?: string;
  where__id__more_than?: number;
  take?: number;
  sort?: Sort;
  keyword?: string;
}

export interface SearchWritingsResponse {
  cursor: {
    after: number | null;
  };
  coont: number;
  next: string | null;
  data: WritingServerModel[];
}

export function searchWritings({
  where__title__i_like,
  where__id__more_than,
  take,
  sort,
  keyword,
  ...filter
}: SearchWritingsRequest) {
  return api.get<SearchWritingsResponse>('/writing/search', {
    params: {
      where__title__i_like,
      where__id__more_than,
      take,
      sort,
      keyword: keyword === '' || keyword === undefined ? undefined : keyword,
      authorIds: filter[FilterType.Author]?.map(item => item.id),
    },
  });
}
