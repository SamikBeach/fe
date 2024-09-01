import { LogServerModel } from '@models/log';
import api from './config';
import { SearchResponse } from './common';

interface SearchLogsRequest {
  page?: number;
}

export interface SearchLogsResponse extends SearchResponse<LogServerModel> {}

export function searchLogs({ page }: SearchLogsRequest) {
  return api.get<SearchLogsResponse>('/log/search', {
    params: {
      page,
    },
  });
}
