import api from '@apis/config';

interface AddEditionCommentLikeRequest {
  editionCommentId: number;
  userId: number;
}

interface AddEditionCommentLikeResponse {
  id: number;
  original_work_comment_id: number;
  user_id: number;
}

export function addEditionCommentLike({
  editionCommentId,
  userId,
}: AddEditionCommentLikeRequest) {
  return api.post<AddEditionCommentLikeResponse>(
    `/edition-comment-like/${editionCommentId}`,
    {
      userId,
    }
  );
}

interface RemoveEditionCommentLikeRequest {
  editionCommentId: number;
  userId: number;
}

interface RemoveEditionCommentLikeResponse {
  affected: number;
}

export function removeEditionCommentLike({
  editionCommentId,
  userId,
}: RemoveEditionCommentLikeRequest) {
  return api.delete<RemoveEditionCommentLikeResponse>(
    `/edition-comment-like/${editionCommentId}`,
    {
      params: { userId },
    }
  );
}

interface GetMyEditionCommentLikeExistRequest {
  editionCommentId: number;
  userId: number;
}

interface GetMyEditionCommentLikeExistResponse {
  isExist: boolean;
}

export function getMyEditionCommentLikeExist({
  editionCommentId,
  userId,
}: GetMyEditionCommentLikeExistRequest) {
  return api.get<GetMyEditionCommentLikeExistResponse>(
    `/edition-comment-like/${editionCommentId}`,
    {
      params: { userId },
    }
  );
}

interface GetEditionCommentLikeCountRequest {
  editionCommentId: number;
}

interface GetEditionCommentLikeCountResponse {
  count: number;
}

export function getEditionCommentLikeCount({
  editionCommentId,
}: GetEditionCommentLikeCountRequest) {
  return api.get<GetEditionCommentLikeCountResponse>(
    `/edition-comment-like/${editionCommentId}/count`
  );
}
