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

interface SearchBooksRequest {
  where__title__i_like?: string;
  take?: number;
  authorId?: number;
}

type SearchBooksResponse = {
  cursor: {
    after: number | null;
  };
  coont: number;
  next: string | null;
  data: BookServerModel[];
};

export function searchBooks({
  where__title__i_like,
  take,
  authorId,
}: SearchBooksRequest) {
  return api.get<SearchBooksResponse>('/book/search', {
    params: {
      where__title__i_like,
      take,
      authorId,
    },
  });
}
