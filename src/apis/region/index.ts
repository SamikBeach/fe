import api from '@apis/config';
import { RegionServerModel } from '@models/region';

type GetAllRegionsResponse = RegionServerModel[];

export function getAllRegions() {
  return api.get<GetAllRegionsResponse>('/region');
}
