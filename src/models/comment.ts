import { UserServerModel } from './user';

export interface CommentServerModel {
  id: number;
  user: UserServerModel;
  comment: string;
  author_id: number;
  target_comment_id?: number;
  target_user_id?: number;
  like_count: number;
  comment_count: number;
  created_at: Date;
  updated_at: Date;
}

export type CommentSort = 'top_likes' | 'top_comments' | 'newest';
