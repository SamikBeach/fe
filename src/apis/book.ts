import api from '@apis/config';
import { BookServerModel } from '@models/book';

type GetAllBooksResponse = BookServerModel[];

export function getAllBooks() {
  return api.get<GetAllBooksResponse>('/book');
}

type GetBookByIdResponse = BookServerModel;

export function getBookById({ id }: { id: number }) {
  return api.get<GetBookByIdResponse>(`/book/${id}`);
}

type SearchBooksResponse = BookServerModel[];

export function searchBooks() {
  return api.get<SearchBooksResponse>('/book/search');
}
