import api from '@apis/config';
import { BookServerModel } from '@models/book';

type GetAllBooksResponse = BookServerModel[];

export function getAllBooks() {
  return api.get<GetAllBooksResponse>('/book');
}

type GetBookResponse = BookServerModel;

export function getBookById({ id }: { id: number }) {
  return api.get<GetBookResponse>(`/book/${id}`);
}
