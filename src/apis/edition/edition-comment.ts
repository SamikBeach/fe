import { SearchResponse } from '@apis/common';
import api from '@apis/config';
import { CommentServerModel, CommentSort } from '@models/comment';

interface GetAllCommentsRequest {
  editionId: number;
}

type GetAllCommentsResponse = CommentServerModel[];

export function getAllEditionComments({ editionId }: GetAllCommentsRequest) {
  return api.get<GetAllCommentsResponse>(`/edition-comment/${editionId}`);
}

interface SearchEditionCommentsRequest {
  editionId: number;
  page?: number;
  sort: CommentSort;
}

export interface SearchEditionCommentsResponse
  extends SearchResponse<CommentServerModel> {}

function getSortBy(sort?: CommentSort) {
  switch (sort) {
    case 'top_likes':
      return 'like_count:DESC';
    case 'top_comments':
      return 'comment_count:DESC';
    case 'newest_first':
      return 'id:DESC';
    default:
      return 'like_count:DESC';
  }
}

export function searchEditionComments({
  editionId,
  page,
  sort,
}: SearchEditionCommentsRequest) {
  return api.get<SearchEditionCommentsResponse>(
    `/edition-comment/${editionId}/search`,
    {
      params: {
        sortBy: getSortBy(sort),
        page,
      },
    }
  );
}

interface AddEditionCommentRequest {
  editionId: number;
  userId: number;
  comment: string;
  targetCommentId?: number;
  targetUserId?: number;
}

interface AddEditionCommentResponse {
  id: number;
  original_work_id: number;
  user_id: number;
}

export function addEditionComment({
  editionId,
  userId,
  comment,
  targetCommentId,
  targetUserId,
}: AddEditionCommentRequest) {
  return api.post<AddEditionCommentResponse>(`/edition-comment/${editionId}`, {
    userId,
    comment,
    targetCommentId,
    targetUserId,
  });
}

interface UpdateEditionCommentRequest {
  commentId: number;
  comment: string;
}

export function updateEditionComment({
  commentId,
  comment,
}: UpdateEditionCommentRequest) {
  return api.patch(`/edition-comment/${commentId}`, {
    comment,
  });
}

interface DeleteEditionCommentRequest {
  commentId: number;
}

export function deleteEditionComment({
  commentId,
}: DeleteEditionCommentRequest) {
  return api.delete(`/edition-comment/${commentId}`);
}

interface GetAllEditionSubCommentsByCommentIdRequest {
  commentId: number;
}

type GetAllEditionSubCommentsByCommentIdResponse = CommentServerModel[];

export function getAllEditionSubCommentsByCommentId({
  commentId,
}: GetAllEditionSubCommentsByCommentIdRequest) {
  return api.get<GetAllEditionSubCommentsByCommentIdResponse>(
    `/edition-comment/commentId/${commentId}`
  );
}
