import api from 'legacy_src/apis/config';
import { SchoolServerModel } from 'legacy_src/models/school';

type GetAllSchoolsResponse = SchoolServerModel[];

export function getAllSchools() {
  return api.get<GetAllSchoolsResponse>('/school');
}
