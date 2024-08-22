import api from 'legacy_src/apis/config';
import { NationalityServerModel } from 'legacy_src/models/nationality';

type GetAllNationalitiesResponse = NationalityServerModel[];

export function getAllNationalities() {
  return api.get<GetAllNationalitiesResponse>('/nationality');
}
