export interface Comment {
  id: number;
  user_id: number;
  comment: string;
  author_id: number;
  target_comment_id?: number;
  target_user_id?: number;
  like_count: number;
  comment_count: number;
  created_at: Date;
  updated_at: Date;
}
