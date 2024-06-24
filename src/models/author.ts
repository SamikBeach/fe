export interface AuthorServerModel {
  id: number;
  name: string;
  name_in_kor: string;
  image_url: string;
  born_date: string | null;
  born_date_is_bc: 1 | null;
  died_date: string | null;
  died_date_is_bc: 1 | null;
  education: string[];
  era?: string[];
  region?: string[];
  main_interest: string[];
  nationality: string;
  school: string[];
  influenced: AuthorServerModel[];
  influenced_by: AuthorServerModel[];
}

// export interface Author {
//   id: number;
//   name: string;
//   nameInKor: string;
//   imageUrl: string;
//   bornDate: string;
//   bornDateIsBc: boolean;
//   diedDate: string;
//   diedDateIsBc: boolean;
//   education: string[];
//   era: string[];
//   region: string[];
//   mainInterest: string[];
//   school: string[];
//   influenced: AuthorServerModel[];
//   influencedBy: AuthorServerModel[];
// }

// AuthorNode
// AuthorEdge
