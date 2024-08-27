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

interface AddOriginalWorkLikeRequest {
  originalWorkId: number;
  userId: number;
}

interface AddOriginalWorkLikeResponse {
  id: number;
  original_work_id: number;
  user_id: number;
}

export function addOriginalWorkLike({
  originalWorkId,
  userId,
}: AddOriginalWorkLikeRequest) {
  return api.post<AddOriginalWorkLikeResponse>(
    `/original-work-like/${originalWorkId}`,
    {
      userId,
    }
  );
}

interface RemoveOriginalWorkLikeRequest {
  originalWorkId: number;
  userId: number;
}

interface RemoveOriginalWorkLikeResponse {
  affected: number;
}

export function removeOriginalWorkLike({
  originalWorkId,
  userId,
}: RemoveOriginalWorkLikeRequest) {
  return api.delete<RemoveOriginalWorkLikeResponse>(
    `/original-work-like/${originalWorkId}`,
    {
      params: { userId },
    }
  );
}

interface FindOriginalWorkLikeRequest {
  originalWorkId: number;
  userId: number;
}

interface FindOriginalWorkLikeResponse {
  isExist: boolean;
}

export function findOriginalWorkLike({
  originalWorkId,
  userId,
}: FindOriginalWorkLikeRequest) {
  return api.get<FindOriginalWorkLikeResponse>(
    `/original-work-like/${originalWorkId}`,
    {
      params: { userId },
    }
  );
}

interface FindOriginalWorkAllLikesRequest {
  originalWorkId: number;
}

interface FindOriginalWorkAllLikesResponse {
  count: number;
}

export function findOriginalWorkAllLikes({
  originalWorkId,
}: FindOriginalWorkAllLikesRequest) {
  return api.get<FindOriginalWorkAllLikesResponse>(
    `/original-work-like/${originalWorkId}/count`
  );
}
