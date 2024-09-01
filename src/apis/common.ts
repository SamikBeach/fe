export interface SearchResponse<T> {
  links: {
    current: string;
    first?: string;
    next?: string;
    previous?: string;
    last?: string;
  };
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: unknown;
    searchBy: unknown;
    search: string;
    select: string[];
    filter?: {
      [column: string]: string | string[];
    };
  };
  data: T[];
}
