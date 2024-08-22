import api from 'legacy_src/apis/config';
import { EducationServerModel } from 'legacy_src/models/education';

type GetAllEducationsResponse = EducationServerModel[];

export function getAllEducations() {
  return api.get<GetAllEducationsResponse>('/education');
}
