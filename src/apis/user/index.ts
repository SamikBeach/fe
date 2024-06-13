import api from '@apis/config';

interface User {
  id: number;
  email: string;
}

type GetAllUsersResponse = User[];

export function getAllUsers() {
  return api.get<GetAllUsersResponse>('/user');
}
