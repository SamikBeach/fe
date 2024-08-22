import api from '@apis/config';
import { AuthorServerModel } from '@models/author';

type GetAllAuthorsResponse = AuthorServerModel[];

export function getAllAuthors() {
  return api.get<GetAllAuthorsResponse>('/author');
}

type GetAuthorByIdResponse = AuthorServerModel;

export function getAuthorById({ id }: { id: number }) {
  return api.get<GetAuthorByIdResponse>(`/author/${id}`);
}

interface SearchAuthorsRequest {
  where__name__i_like?: string;
  where__id__more_than?: number;
  take?: number;
  keyword?: string;
}

export interface SearchAuthorsResponse {
  cursor: {
    after: number | null;
  };
  count: number;
  next: string | null;
  data: AuthorServerModel[];
}

export function searchAuthors({
  take,
  where__name__i_like,
  where__id__more_than,
  keyword,
}: SearchAuthorsRequest) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      where__name__i_like,
      where__id__more_than,
      take,
      keyword: keyword === '' || keyword === undefined ? undefined : keyword,
    },
  });
}
