import api from '@apis/config';
import { SchoolServerModel } from '@models/school';

type GetAllSchoolsResponse = SchoolServerModel[];

export function getAllSchools() {
  return api.get<GetAllSchoolsResponse>('/school');
}
