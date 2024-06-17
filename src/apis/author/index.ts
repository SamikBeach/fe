import api from '@apis/config';

interface Author {
  id: 1;
  born_date: string;
  born_date_is_bc: 1 | null;
  died_date: string;
  died_date_is_bc: 1 | null;
  image_url: string;
  name: string;
  name_in_kor: string;
}

type GetAllBooksResponse = Author[];

export function getAllAuthors() {
  return api.get<GetAllBooksResponse>('/author');
}
