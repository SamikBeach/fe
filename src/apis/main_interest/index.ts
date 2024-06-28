import api from '@apis/config';
import { MainInterestServerModel } from '@models/main_interest';

type GetAllMainInterestsResponse = MainInterestServerModel[];

export function getAllMainInterests() {
  return api.get<GetAllMainInterestsResponse>('/main-interest');
}
