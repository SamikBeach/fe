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

type SearchAuthorsResponse = AuthorServerModel[];

export function searchAuthors({
  nationalityId,
  eraId,
  regionId,
  mainInterestId,
  schoolId,
  educationId,
}: {
  nationalityId?: number;
  eraId?: number;
  regionId?: number;
  mainInterestId?: number;
  schoolId?: number;
  educationId?: number;
}) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      nationalityId,
      eraId,
      regionId,
      mainInterestId,
      schoolId,
      educationId,
    },
  });
}