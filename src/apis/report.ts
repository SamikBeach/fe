import api from '@apis/config';
import { ReportServerModel } from '@models/report';

interface PostReportRequest {
  user_id?: number;
  type_id: number;
  origin_type_id: number;
  description?: string;
}

type PostReportResponse = ReportServerModel;

export function postReport(param: PostReportRequest) {
  return api.post<PostReportResponse>('/report', param);
}
