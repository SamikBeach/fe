import { AuthorServerModel } from './author';
import { BookServerModel } from './book';

export interface WritingServerModel {
  id: number;
  author_id: number;
  title: string;
  title_in_kor: string | null;
  title_in_eng: string | null;
  publication_date: string;
  publication_date_is_bc: 1 | null;
  author: AuthorServerModel;
  book: BookServerModel[];
}
