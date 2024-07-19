import api from '@apis/config';
import { WritingServerModel } from '@models/writing';

type GetWritingByIdResponse = WritingServerModel;

export function getWritingById({ id }: { id: number }) {
  return api.get<GetWritingByIdResponse>(`/writing/${id}`);
}

interface SearchWritingsRequest {
  where__title__i_like?: string;
  where__id__more_than?: number;
  take?: number;
  authorId?: number;
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
  authorId,
}: SearchWritingsRequest) {
  return api.get<SearchWritingsResponse>('/writing/search', {
    params: {
      where__title__i_like,
      where__id__more_than,
      take,
      authorId,
    },
  });
}
