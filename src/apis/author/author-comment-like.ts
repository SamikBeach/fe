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

interface FindAuthorCommentLikeRequest {
  authorCommentId: number;
  userId: number;
}

interface FindAuthorCommentLikeResponse {
  isExist: boolean;
}

export function getMyAuthorCommentLikeExist({
  authorCommentId,
  userId,
}: FindAuthorCommentLikeRequest) {
  return api.get<FindAuthorCommentLikeResponse>(
    `/author-comment-like/${authorCommentId}`,
    {
      params: { userId },
    }
  );
}

interface FindAuthorAllLikesRequest {
  authorCommentId: number;
}

interface FindAuthorAllLikesResponse {
  count: number;
}

export function getAuthorCommentLikeCount({
  authorCommentId,
}: FindAuthorAllLikesRequest) {
  return api.get<FindAuthorAllLikesResponse>(
    `/author-comment-like/${authorCommentId}/count`
  );
}
