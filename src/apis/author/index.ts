import api from '@apis/config';

interface Author {}

export function getAllAuthors() {
  return api.get('/author');
}
