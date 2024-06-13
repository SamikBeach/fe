import api from '@apis/config';

export function getAllBooks() {
  return api.get('/book');
}
