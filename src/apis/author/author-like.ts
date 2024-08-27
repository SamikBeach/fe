import api from '@apis/config';

interface AddAuthorLikeRequest {
  authorId: number;
  userId: number;
}

interface AddAuthorLikeResponse {
  id: number;
  author_id: number;
  user_id: number;
}

export function addAuthorLike({ authorId, userId }: AddAuthorLikeRequest) {
  return api.post<AddAuthorLikeResponse>(`/author-like/${authorId}`, {
    userId,
  });
}

interface RemoveAuthorLikeRequest {
  authorId: number;
  userId: number;
}

interface RemoveAuthorLikeResponse {
  affected: number;
}

export function removeAuthorLike({
  authorId,
  userId,
}: RemoveAuthorLikeRequest) {
  return api.delete<RemoveAuthorLikeResponse>(`/author-like/${authorId}`, {
    params: { userId },
  });
}

interface FindAuthorLikeRequest {
  authorId: number;
  userId: number;
}

interface FindAuthorLikeResponse {
  isExist: boolean;
}

export function getMyAuthorLikeExist({
  authorId,
  userId,
}: FindAuthorLikeRequest) {
  return api.get<FindAuthorLikeResponse>(`/author-like/${authorId}`, {
    params: { userId },
  });
}

interface FindAuthorAllLikesRequest {
  authorId: number;
}

interface FindAuthorAllLikesResponse {
  count: number;
}

export function getAuthorLikeCount({ authorId }: FindAuthorAllLikesRequest) {
  return api.get<FindAuthorAllLikesResponse>(`/author-like/${authorId}/count`);
}
