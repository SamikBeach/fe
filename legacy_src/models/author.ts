import { BookServerModel } from './book';
import { EducationServerModel } from './education';
import { EraServerModel } from './era';
import { MainInterestServerModel } from './main_interest';
import { NationalityServerModel } from './nationality';
import { RegionServerModel } from './region';
import { SchoolServerModel } from './school';
import { WritingServerModel } from './writing';

export interface AuthorServerModel {
  id: number;
  name: string;
  // 클라 모델 별도 구현
  activeInfluencedBy?: boolean;
  activeInfluenced?: boolean;
  activeFiltered?: boolean;
  name_in_kor: string;
  image_url?: string | null;
  born_date?: string | null;
  born_date_is_bc?: 0 | 1 | null;
  died_date?: string | null;
  died_date_is_bc?: 0 | 1 | null;
  educations?: EducationServerModel[];
  eras?: EraServerModel[];
  regions?: RegionServerModel[];
  main_interests?: MainInterestServerModel[];
  nationality?: NationalityServerModel;
  schools?: SchoolServerModel[];
  influenceds?: AuthorServerModel[];
  influenced_bys?: AuthorServerModel[];
  writings?: WritingServerModel[];
  books?: BookServerModel[];
}
