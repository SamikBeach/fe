import { AuthorServerModel } from './author';
import { CommentServerModel } from './comment';
import { UserServerModel } from './user';

export interface EditionServerModel {
  id: number;
  author_id: number;
  title: string;
  image_url: string | null;
  publication_date: string;
  publisher: string;
  isbn: string | null;
  isbn13: string | null;

  author: AuthorServerModel;
  liked_users?: UserServerModel[];
  comments?: CommentServerModel[];
  like_count: number;
  comment_count: number;
}

export type EditionSort =
  | 'top_likes'
  | 'top_comments'
  | 'publication_date_newest_first'
  | 'publication_date_oldest_first'
  | 'alphabetical';
