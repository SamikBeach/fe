import api from 'legacy_src/apis/config';
import { User } from 'legacy_src/models/user';

type GetAllUsersResponse = User[];

export function getAllUsers() {
  return api.get<GetAllUsersResponse>('/user');
}
