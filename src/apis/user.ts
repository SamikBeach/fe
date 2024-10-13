import api from '@apis/config';
import { AuthorServerModel } from '@models/author';
import { EditionServerModel } from '@models/edition';
import { OriginalWorkServerModel } from '@models/original-work';
import { UserServerModel } from '@models/user';
import { SearchResponse } from './common';

type GetAllUsersResponse = UserServerModel[];

export function getAllUsers() {
  return api.get<GetAllUsersResponse>('/user');
}

type GetMyUserInfoResponse = UserServerModel;

export function getMyUserInfo() {
  return api.get<GetMyUserInfoResponse>('/user/my');
}

interface GetUserInfoByIdRequest {
  userId: number;
}

type GetUserInfoByIdResponse = UserServerModel;

export function getUserInfoById({ userId }: GetUserInfoByIdRequest) {
  return api.get<GetUserInfoByIdResponse>(`/user/${userId}`);
}

interface GetUserLikesRequest {
  userId: number;
}

interface GetUserLikesResponse {
  authors: AuthorServerModel[];
  original_works: OriginalWorkServerModel[];
  editions: EditionServerModel[];
}

export function getUserLikes({ userId }: GetUserLikesRequest) {
  return api.get<GetUserLikesResponse>(`/user/${userId}/like`);
}

interface GetUserCommentsRequest {
  userId: number;
}

interface GetUserCommentsResponse {
  authors: AuthorServerModel[];
  original_works: OriginalWorkServerModel[];
  editions: EditionServerModel[];
}

export function getUserComments({ userId }: GetUserCommentsRequest) {
  return api.get<GetUserCommentsResponse>(`/user/${userId}/comment`);
}

interface SearchUsersRequest {
  page?: number;
  keyword?: string;
  limit?: number;
}

export interface SearchUsersResponse extends SearchResponse<UserServerModel> {}

export function searchUsers({ page, keyword, limit }: SearchUsersRequest) {
  return api.get<SearchUsersResponse>('/user/search', {
    params: {
      search: keyword === '' ? undefined : keyword,
      page,
      limit,
    },
  });
}
