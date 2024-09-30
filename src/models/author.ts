import { CommentServerModel } from './comment';
import { EraServerModel } from './era';
import { UserServerModel } from './user';

export interface AuthorServerModel {
  id: number;
  name: string;
  name_in_kor: string;
  image_url?: string | null;
  born_date?: string | null;
  born_date_is_bc?: 0 | 1 | null;
  died_date?: string | null;
  died_date_is_bc?: 0 | 1 | null;
  era?: EraServerModel;
  liked_users?: UserServerModel[];
  comments?: CommentServerModel[];
  like_count: number;
  comment_count: number;
  original_work_count: number;
  edition_count: number;
}

export type AuthorSort =
  | 'top_likes'
  | 'top_comments'
  | 'top_original_works'
  | 'top_editions'
  | 'birth_date_youngest_first'
  | 'birth_date_oldest_first'
  | 'alphabetical';
