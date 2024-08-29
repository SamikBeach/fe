import { LogServerModel } from '@models/log';
import api from './config';

interface SearchLogsRequest {
  where__id__less_than?: number;
  order__id?: 'ASC' | 'DESC';
  take?: number;
}

export interface SearchLogsResponse {
  cursor: {
    after: number | null;
  };
  count: number;
  next: string | null;
  data: LogServerModel[];
}

export function searchLogs({
  take,
  where__id__less_than,
  order__id,
}: SearchLogsRequest) {
  return api.get<SearchLogsResponse>('/log/search', {
    params: {
      where__id__less_than,
      order__id,
      take,
    },
  });
}
