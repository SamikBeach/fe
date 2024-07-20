import api from '@apis/config';
import { Filter } from '@components/Filter/models';
import { FilterType } from '@components/Filter/models';
import { AuthorServerModel } from '@models/author';

type GetAllAuthorsResponse = AuthorServerModel[];

export function getAllAuthors() {
  return api.get<GetAllAuthorsResponse>('/author');
}

type GetAuthorByIdResponse = AuthorServerModel;

export function getAuthorById({ id }: { id: number }) {
  return api.get<GetAuthorByIdResponse>(`/author/${id}`);
}

interface SearchAuthorsRequest extends Partial<Filter> {
  where__name__i_like?: string;
  where__id__more_than?: number;
  take?: number;
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
  ...filter
}: SearchAuthorsRequest) {
  return api.get<SearchAuthorsResponse>('/author/search', {
    params: {
      nationalityIds: filter[FilterType.Nationality]?.map(item => item.id),
      regionIds: filter[FilterType.Region]?.map(item => item.id),
      schoolIds: filter[FilterType.School]?.map(item => item.id),
      eraIds: filter[FilterType.Era]?.map(item => item.id),
      educationIds: filter[FilterType.Education]?.map(item => item.id),
      mainInterestIds: filter[FilterType.MainInterest]?.map(item => item.id),
      where__name__i_like,
      where__id__more_than,
      take,
    },
  });
}
