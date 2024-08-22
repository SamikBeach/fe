import api from '@apis/config';
import { UserServerModel } from '@models/user';

type GetAllUsersResponse = UserServerModel[];

export function getAllUsers() {
  return api.get<GetAllUsersResponse>('/user');
}
