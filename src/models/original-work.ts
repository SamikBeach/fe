import { AuthorServerModel } from './author';
import { CommentServerModel } from './comment';
import { EditionServerModel } from './edition';
import { UserServerModel } from './user';

export interface OriginalWorkServerModel {
  id: number;
  author_id: number;
  title: string;
  title_in_kor?: string | null;
  title_in_eng?: string | null;
  publication_date?: string | null;
  publication_date_is_bc?: 0 | 1 | null;
  posthumous?: 0 | 1 | null;
  circa?: 0 | 1 | null;
  century?: number | null;
  s?: 0 | 1 | null;
  author: AuthorServerModel;
  liked_users?: UserServerModel[];
  comments?: CommentServerModel[];
  like_count: number;
  comment_count: number;
  edition_count: number;
  editions: EditionServerModel[];
}

export type OriginalWorkSort =
  | 'top_likes'
  | 'top_comments'
  | 'top_editions'
  | 'publication_date_newest_first'
  | 'publication_date_oldest_first'
  | 'alphabetical';
