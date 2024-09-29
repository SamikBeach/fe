import { CommentServerModel } from './comment';
import { EditionServerModel } from './edition';
import { EraServerModel } from './era';
import { OriginalWorkServerModel } from './original-work';
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
  original_works?: OriginalWorkServerModel[];
  liked_users?: UserServerModel[];
  comments?: CommentServerModel[];
  like_count: number;
  comment_count: number;
  editions?: EditionServerModel[];
}

export type AuthorSort =
  | 'top_likes'
  | 'top_comments'
  | 'birth_date_youngest_first'
  | 'birth_date_oldest_first'
  | 'alphabetical';
