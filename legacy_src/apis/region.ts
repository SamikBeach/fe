import api from 'legacy_src/apis/config';
import { RegionServerModel } from 'legacy_src/models/region';

type GetAllRegionsResponse = RegionServerModel[];

export function getAllRegions() {
  return api.get<GetAllRegionsResponse>('/region');
}
