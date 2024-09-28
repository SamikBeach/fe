import api from '@apis/config';

interface AddEditionLikeRequest {
  editionId: number;
  userId: number;
}

interface AddEditionLikeResponse {
  id: number;
  original_work_id: number;
  user_id: number;
}

export function addEditionLike({ editionId, userId }: AddEditionLikeRequest) {
  return api.post<AddEditionLikeResponse>(`/edition-like/${editionId}`, {
    userId,
  });
}

interface RemoveEditionLikeRequest {
  editionId: number;
  userId: number;
}

interface RemoveEditionLikeResponse {
  affected: number;
}

export function removeEditionLike({
  editionId,
  userId,
}: RemoveEditionLikeRequest) {
  return api.delete<RemoveEditionLikeResponse>(`/edition-like/${editionId}`, {
    params: { userId },
  });
}

interface GetMyEditionLikeExistRequest {
  editionId: number;
  userId: number;
}

interface GetMyEditionLikeExistResponse {
  isExist: boolean;
}

export function getMyEditionLikeExist({
  editionId,
  userId,
}: GetMyEditionLikeExistRequest) {
  return api.get<GetMyEditionLikeExistResponse>(`/edition-like/${editionId}`, {
    params: { userId },
  });
}

interface GetEditionLikeCountRequest {
  editionId: number;
}

interface GetEditionLikeCountResponse {
  count: number;
}

export function getEditionLikeCount({ editionId }: GetEditionLikeCountRequest) {
  return api.get<GetEditionLikeCountResponse>(
    `/edition-like/${editionId}/count`
  );
}
