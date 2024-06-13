import api from '@apis/config';

interface Book {
  id: number;
  isbn: string;
}

type GetAllBooksResponse = Book[];

export function getAllBooks() {
  return api.get<GetAllBooksResponse>('/book');
}
