export interface AuthorServerModel {
  id: number;
  born_date: string;
  born_date_is_bc: 1 | null;
  died_date: string;
  died_date_is_bc: 1 | null;
  image_url: string;
  name: string;
  name_in_kor: string;
}

export interface Author {
  id: number;
  bornDate: string;
  bornDateIsBc: 1 | null;
  diedDate: string;
  diedDateIsBc: 1 | null;
  imageUrl: string;
  name: string;
  nameInKor: string;
}

// AuthorNode
// AuthorEdge
