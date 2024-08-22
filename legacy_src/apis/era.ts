import api from 'legacy_src/apis/config';
import { EraServerModel } from 'legacy_src/models/era';

type GetAllErasResponse = EraServerModel[];

export function getAllEras() {
  return api.get<GetAllErasResponse>('/era');
}
