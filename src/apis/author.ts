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
  nationalityId?: number;
  eraId?: number;
  regionId?: number;
  mainInterestId?: number;
  schoolId?: number;
  educationId?: number;
  where__name__i_like?: string;
  take?: number;
}

type SearchAuthorsResponse = {
  cursor: {
    after: number | null;
  };
  coont: number;
  next: string | null;
  data: AuthorServerModel[];
};

export function searchAuthors({
  nationalityId,
  eraId,
  regionId,
  mainInterestId,
  schoolId,
  educationId,
  where__name__i_like,
  take,
}: SearchAuthorsRequest) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      nationalityId,
      eraId,
      regionId,
      mainInterestId,
      schoolId,
      educationId,
      where__name__i_like,
      take,
    },
  });
}
