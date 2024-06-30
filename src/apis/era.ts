import api from '@apis/config';
import { EraServerModel } from '@models/era';

type GetAllErasResponse = EraServerModel[];

export function getAllEras() {
  return api.get<GetAllErasResponse>('/era');
}
