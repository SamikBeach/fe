import api from '@apis/config';

interface AddOriginalWorkCommentLikeRequest {
  originalWorkCommentId: number;
  userId: number;
}

interface AddOriginalWorkCommentLikeResponse {
  id: number;
  original_work_comment_id: number;
  user_id: number;
}

export function addOriginalWorkCommentLike({
  originalWorkCommentId,
  userId,
}: AddOriginalWorkCommentLikeRequest) {
  return api.post<AddOriginalWorkCommentLikeResponse>(
    `/original-work-comment-like/${originalWorkCommentId}`,
    {
      userId,
    }
  );
}

interface RemoveOriginalWorkCommentLikeRequest {
  originalWorkCommentId: number;
  userId: number;
}

interface RemoveOriginalWorkCommentLikeResponse {
  affected: number;
}

export function removeOriginalWorkCommentLike({
  originalWorkCommentId,
  userId,
}: RemoveOriginalWorkCommentLikeRequest) {
  return api.delete<RemoveOriginalWorkCommentLikeResponse>(
    `/original-work-comment-like/${originalWorkCommentId}`,
    {
      params: { userId },
    }
  );
}

interface GetMyOriginalWorkCommentLikeExistRequest {
  originalWorkCommentId: number;
  userId: number;
}

interface GetMyOriginalWorkCommentLikeExistResponse {
  isExist: boolean;
}

export function getMyOriginalWorkCommentLikeExist({
  originalWorkCommentId,
  userId,
}: GetMyOriginalWorkCommentLikeExistRequest) {
  return api.get<GetMyOriginalWorkCommentLikeExistResponse>(
    `/original-work-comment-like/${originalWorkCommentId}`,
    {
      params: { userId },
    }
  );
}

interface GetOriginalWorkCommentLikeCountRequest {
  originalWorkCommentId: number;
}

interface GetOriginalWorkCommentLikeCountResponse {
  count: number;
}

export function getOriginalWorkCommentLikeCount({
  originalWorkCommentId,
}: GetOriginalWorkCommentLikeCountRequest) {
  return api.get<GetOriginalWorkCommentLikeCountResponse>(
    `/original-work-comment-like/${originalWorkCommentId}/count`
  );
}
