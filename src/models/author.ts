import { WritingServerModel } from './writing';

export interface AuthorServerModel {
  id: number;
  name: string;
  // 클라 모델 별도 구현
  activeInfluencedBy?: boolean;
  activeInfluenced?: boolean;
  activeFiltered?: boolean;
  name_in_kor: string;
  image_url: string;
  born_date: string | null;
  born_date_is_bc: 1 | null;
  died_date: string | null;
  died_date_is_bc: 1 | null;
  education?: {
    id: number;
    education: string;
  }[];
  era?: {
    id: number;
    era: string;
  }[];
  region?: {
    id: number;
    region: string;
  }[];
  main_interest?: {
    id: number;
    main_interest: string;
  }[];
  nationality?: {
    id: number;
    nationality: string;
  };
  school?: {
    id: number;
    school: string;
  }[];
  influenced: AuthorServerModel[];
  influenced_by: AuthorServerModel[];
  writing: WritingServerModel[];
  book: {
    id: number;
    isbn: string;
  }[];
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
