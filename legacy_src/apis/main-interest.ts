import api from 'legacy_src/apis/config';
import { MainInterestServerModel } from 'legacy_src/models/main_interest';

type GetAllMainInterestsResponse = MainInterestServerModel[];

export function getAllMainInterests() {
  return api.get<GetAllMainInterestsResponse>('/main-interest');
}
