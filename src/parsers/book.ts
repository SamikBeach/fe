import { Book, BookServerModel } from '@models/book';

export function parseBookModel(data: BookServerModel): Book {
  return data;
}
