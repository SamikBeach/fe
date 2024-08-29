import { AuthorServerModel } from './author';
import { CommentServerModel } from './comment';
import { OriginalWorkServerModel } from './original-work';
import { UserServerModel } from './user';

export interface LogServerModel {
  id: number;
  user: UserServerModel;
  author_comment?: CommentServerModel;
  original_work_comment?: CommentServerModel;
  target_author?: AuthorServerModel;
  target_original_work?: OriginalWorkServerModel;
  created_at: Date;
  updated_at: Date;
}
