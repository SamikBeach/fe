import api from '@apis/config';
import { NationalityServerModel } from '@models/nationality';

type GetAllNationalitiesResponse = NationalityServerModel[];

export function getAllNationalities() {
  return api.get<GetAllNationalitiesResponse>('/nationality');
}
