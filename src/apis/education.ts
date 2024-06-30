import api from '@apis/config';
import { EducationServerModel } from '@models/education';

type GetAllEducationsResponse = EducationServerModel[];

export function getAllEducations() {
  return api.get<GetAllEducationsResponse>('/education');
}
