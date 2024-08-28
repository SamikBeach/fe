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

interface GetMyOriginalWorkLikeExistRequest {
  originalWorkId: number;
  userId: number;
}

interface GetMyOriginalWorkLikeExistResponse {
  isExist: boolean;
}

export function getMyOriginalWorkLikeExist({
  originalWorkId,
  userId,
}: GetMyOriginalWorkLikeExistRequest) {
  return api.get<GetMyOriginalWorkLikeExistResponse>(
    `/original-work-like/${originalWorkId}`,
    {
      params: { userId },
    }
  );
}

interface GetOriginalWorkLikeCountRequest {
  originalWorkId: number;
}

interface GetOriginalWorkLikeCountResponse {
  count: number;
}

export function getOriginalWorkLikeCount({
  originalWorkId,
}: GetOriginalWorkLikeCountRequest) {
  return api.get<GetOriginalWorkLikeCountResponse>(
    `/original-work-like/${originalWorkId}/count`
  );
}
