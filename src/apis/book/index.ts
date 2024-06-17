import api from '@apis/config';
import { BookServerModel } from '@models/book';

type GetAllBooksResponse = BookServerModel[];

export function getAllBooks() {
  return api.get<GetAllBooksResponse>('/book');
}
