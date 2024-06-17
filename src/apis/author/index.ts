import api from '@apis/config';
import { AuthorServerModel } from '@models/author';

type GetAllBooksResponse = AuthorServerModel[];

export function getAllAuthors() {
  return api.get<GetAllBooksResponse>('/author');
}
