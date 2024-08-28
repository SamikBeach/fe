import api from '@apis/config';

interface AddAuthorCommentLikeRequest {
  authorCommentId: number;
  userId: number;
}

interface AddAuthorCommentLikeResponse {
  id: number;
  author_comment_id: number;
  user_id: number;
}

export function addAuthorCommentLike({
  authorCommentId,
  userId,
}: AddAuthorCommentLikeRequest) {
  return api.post<AddAuthorCommentLikeResponse>(
    `/author-comment-like/${authorCommentId}`,
    {
      userId,
    }
  );
}

interface RemoveAuthorCommentLikeRequest {
  authorCommentId: number;
  userId: number;
}

interface RemoveAuthorCommentLikeResponse {
  affected: number;
}

export function removeAuthorCommentLike({
  authorCommentId,
  userId,
}: RemoveAuthorCommentLikeRequest) {
  return api.delete<RemoveAuthorCommentLikeResponse>(
    `/author-comment-like/${authorCommentId}`,
    {
      params: { userId },
    }
  );
}

interface GetMyAuthorCommentLikeExistRequest {
  authorCommentId: number;
  userId: number;
}

interface GetMyAuthorCommentLikeExistResponse {
  isExist: boolean;
}

export function getMyAuthorCommentLikeExist({
  authorCommentId,
  userId,
}: GetMyAuthorCommentLikeExistRequest) {
  return api.get<GetMyAuthorCommentLikeExistResponse>(
    `/author-comment-like/${authorCommentId}`,
    {
      params: { userId },
    }
  );
}

interface GetAuthorCommentLikeCountRequest {
  authorCommentId: number;
}

interface GetAuthorCommentLikeCountResponse {
  count: number;
}

export function getAuthorCommentLikeCount({
  authorCommentId,
}: GetAuthorCommentLikeCountRequest) {
  return api.get<GetAuthorCommentLikeCountResponse>(
    `/author-comment-like/${authorCommentId}/count`
  );
}
