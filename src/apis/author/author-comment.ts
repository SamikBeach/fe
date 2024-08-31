import api from '@apis/config';
import { CommentServerModel, CommentSort } from '@models/comment';

interface GetAllCommentsRequest {
  authorId: number;
}

type GetAllCommentsResponse = CommentServerModel[];

export function getAllAuthorComments({ authorId }: GetAllCommentsRequest) {
  return api.get<GetAllCommentsResponse>(`/author-comment/${authorId}`);
}

export interface SearchAuthorsCommentsRequest {
  where__id__more_than?: number;
  authorId: number;
  take?: number;
  sort?: CommentSort;
}

export interface SearchAuthorCommentsResponse {
  cursor: {
    after: number | null;
  };
  count: number;
  next: string | null;
  data: CommentServerModel[];
}

export function searchAuthorComments({
  authorId,
  where__id__more_than,
  sort,
  take,
}: SearchAuthorsCommentsRequest) {
  return api.get<SearchAuthorCommentsResponse>(
    `/author-comment/${authorId}/search`,
    {
      params: {
        where__id__more_than,
        sort,
        take,
      },
    }
  );
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

interface UpdateAuthorCommentRequest {
  commentId: number;
  comment: string;
}

export function updateAuthorComment({
  commentId,
  comment,
}: UpdateAuthorCommentRequest) {
  return api.patch(`/author-comment/${commentId}`, {
    comment,
  });
}

interface DeleteAuthorCommentRequest {
  commentId: number;
}

export function deleteAuthorComment({ commentId }: DeleteAuthorCommentRequest) {
  return api.delete(`/author-comment/${commentId}`);
}

interface GetAllAuthorSubCommentsByCommentIdRequest {
  commentId: number;
}

type GetAllAuthorSubCommentsByCommentIdResponse = CommentServerModel[];

export function getAllAuthorSubCommentsByCommentId({
  commentId,
}: GetAllAuthorSubCommentsByCommentIdRequest) {
  return api.get<GetAllAuthorSubCommentsByCommentIdResponse>(
    `/author-comment/commentId/${commentId}`
  );
}
