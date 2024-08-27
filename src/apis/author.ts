import api from '@apis/config';
import { AuthorSort } from '@atoms/sort';
import { AuthorServerModel } from '@models/author';
import { Comment } from '@models/comment';

type GetAllAuthorsResponse = AuthorServerModel[];

export function getAllAuthors() {
  return api.get<GetAllAuthorsResponse>('/author');
}

type GetAuthorByIdResponse = AuthorServerModel;

export function getAuthorById({ id }: { id: number }) {
  return api.get<GetAuthorByIdResponse>(`/author/${id}`);
}

interface SearchAuthorsRequest {
  where__name__i_like?: string;
  where__id__more_than?: number;
  order__name?: 'ASC' | 'DESC';
  take?: number;
  keyword?: string;
  eraId?: number | null;
  sort?: AuthorSort;
}

export interface SearchAuthorsResponse {
  cursor: {
    after: number | null;
  };
  count: number;
  next: string | null;
  data: AuthorServerModel[];
}

export function searchAuthors({
  take,
  where__name__i_like,
  where__id__more_than,
  order__name = 'ASC',
  keyword,
  eraId,
  sort,
}: SearchAuthorsRequest) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      where__name__i_like,
      where__id__more_than,
      order__name,
      take,
      keyword: keyword === '' ? undefined : keyword,
      eraId,
      sort,
    },
  });
}

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

export function findAuthorLike({ authorId, userId }: FindAuthorLikeRequest) {
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

export function findAuthorAllLikes({ authorId }: FindAuthorAllLikesRequest) {
  return api.get<FindAuthorAllLikesResponse>(`/author-like/${authorId}/count`);
}

interface GetAllCommentsRequest {
  authorId: number;
}

type GetAllCommentsResponse = Comment[];

export function getAllAuthorComments({ authorId }: GetAllCommentsRequest) {
  return api.get<GetAllCommentsResponse>(`/author-comment/${authorId}`);
}

interface AddAuthorCommentRequest {
  authorId: number;
  userId: number;
  comment: string;
  targetCommentId?: number;
  targetUserId?: number;
}

interface AddAuthorCommentResponse {
  id: number;
  author_id: number;
  user_id: number;
}

export function addAuthorComment({
  authorId,
  userId,
  comment,
  targetCommentId,
  targetUserId,
}: AddAuthorCommentRequest) {
  return api.post<AddAuthorCommentResponse>(`/author-comment/${authorId}`, {
    userId,
    comment,
    targetCommentId,
    targetUserId,
  });
}
