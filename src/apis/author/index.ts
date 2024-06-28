import api from '@apis/config';
import { AuthorServerModel } from '@models/author';

type GetAllBooksResponse = AuthorServerModel[];

export function getAllAuthors() {
  return api.get<GetAllBooksResponse>('/author');
}

type GetAuthorByIdResponse = AuthorServerModel;

export function getAuthorById({ id }: { id: number }) {
  return api.get<GetAuthorByIdResponse>(`/author/${id}`);
}

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
  return api.get<GetAllBooksResponse>('/author/search', {
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
