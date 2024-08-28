import api from '@apis/config';

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