import { AuthorServerModel } from './author';
import { CommentServerModel } from './comment';
import { UserServerModel } from './user';

export interface OriginalWorkServerModel {
  id: number;
  author_id: number;
  title: string;
  title_in_kor?: string | null;
  title_in_eng?: string | null;
  publication_date?: string | null;
  publication_date_is_bc?: 0 | 1 | null;
  author: AuthorServerModel;
  liked_users?: UserServerModel[];
  comments?: CommentServerModel[];
}
