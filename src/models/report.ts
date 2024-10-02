export interface ReportServerModel {
  id: number;
  user_id: number;
  type_id: number;
  origin_type_id: number;
  description?: string;
  created_at: Date;
}
