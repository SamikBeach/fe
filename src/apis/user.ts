import api from '@apis/config';
import { User } from '@models/user';

type GetAllUsersResponse = User[];

export function getAllUsers() {
  return api.get<GetAllUsersResponse>('/user');
}
