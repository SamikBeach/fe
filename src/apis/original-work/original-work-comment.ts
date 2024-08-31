import api from '@apis/config';
import { CommentServerModel, CommentSort } from '@models/comment';

interface GetAllCommentsRequest {
  originalWorkId: number;
}

type GetAllCommentsResponse = CommentServerModel[];

export function getAllOriginalWorkComments({
  originalWorkId,
}: GetAllCommentsRequest) {
  return api.get<GetAllCommentsResponse>(
    `/original-work-comment/${originalWorkId}`
  );
}

export interface SearchOriginalWorkCommentsRequest {
  where__id__more_than?: number;
  originalWorkId: number;
  take?: number;
  sort?: CommentSort;
}

export interface SearchOriginalWorkCommentsResponse {
  cursor: {
    after: number | null;
  };
  count: number;
  next: string | null;
  data: CommentServerModel[];
}

export function searchOriginalWorkComments({
  originalWorkId,
  where__id__more_than,
  sort,
  take,
}: SearchOriginalWorkCommentsRequest) {
  return api.get<SearchOriginalWorkCommentsResponse>(
    `/original-work-comment/${originalWorkId}/search`,
    {
      params: {
        where__id__more_than,
        sort,
        take,
      },
    }
  );
}

interface AddOriginalWorkCommentRequest {
  originalWorkId: number;
  userId: number;
  comment: string;
  targetCommentId?: number;
  targetUserId?: number;
}

interface AddOriginalWorkCommentResponse {
  id: number;
  original_work_id: number;
  user_id: number;
}

export function addOriginalWorkComment({
  originalWorkId,
  userId,
  comment,
  targetCommentId,
  targetUserId,
}: AddOriginalWorkCommentRequest) {
  return api.post<AddOriginalWorkCommentResponse>(
    `/original-work-comment/${originalWorkId}`,
    {
      userId,
      comment,
      targetCommentId,
      targetUserId,
    }
  );
}

interface UpdateOriginalWorkCommentRequest {
  commentId: number;
  comment: string;
}

export function updateOriginalWorkComment({
  commentId,
  comment,
}: UpdateOriginalWorkCommentRequest) {
  return api.patch(`/original-work-comment/${commentId}`, {
    comment,
  });
}

interface DeleteOriginalWorkCommentRequest {
  commentId: number;
}

export function deleteOriginalWorkComment({
  commentId,
}: DeleteOriginalWorkCommentRequest) {
  return api.delete(`/original-work-comment/${commentId}`);
}

interface GetAllOriginalWorkSubCommentsByCommentIdRequest {
  commentId: number;
}

type GetAllOriginalWorkSubCommentsByCommentIdResponse = CommentServerModel[];

export function getAllOriginalWorkSubCommentsByCommentId({
  commentId,
}: GetAllOriginalWorkSubCommentsByCommentIdRequest) {
  return api.get<GetAllOriginalWorkSubCommentsByCommentIdResponse>(
    `/original-work-comment/commentId/${commentId}`
  );
}
