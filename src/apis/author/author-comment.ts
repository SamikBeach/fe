import api from '@apis/config';
import { CommentServerModel } from '@models/comment';

interface GetAllCommentsRequest {
  authorId: number;
}

type GetAllCommentsResponse = CommentServerModel[];

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

export function deleteAuthorComment({ commentId }: { commentId: number }) {
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
