import api from '@apis/config';
import { Filter, FilterType } from '@models/filter';
import { WritingServerModel } from '@models/writing';

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
  ...filter
}: SearchWritingsRequest) {
  return api.get<SearchWritingsResponse>('/writing/search', {
    params: {
      where__title__i_like,
      where__id__more_than,
      take,
      authorIds: filter[FilterType.Author]?.map(item => item.id),
    },
  });
}
