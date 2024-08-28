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

interface GetMyAuthorLikeExistRequest {
  authorId: number;
  userId: number;
}

interface GetMyAuthorLikeExistResponse {
  isExist: boolean;
}

export function getMyAuthorLikeExist({
  authorId,
  userId,
}: GetMyAuthorLikeExistRequest) {
  return api.get<GetMyAuthorLikeExistResponse>(`/author-like/${authorId}`, {
    params: { userId },
  });
}

interface GetAuthorLikeCountRequest {
  authorId: number;
}

interface GetAuthorLikeCountResponse {
  count: number;
}

export function getAuthorLikeCount({ authorId }: GetAuthorLikeCountRequest) {
  return api.get<GetAuthorLikeCountResponse>(`/author-like/${authorId}/count`);
}
