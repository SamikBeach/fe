import { EraServerModel } from './era';
import { OriginalWorkServerModel } from './original_work';

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
  era?: EraServerModel;
  influenceds?: AuthorServerModel[];
  influenced_bys?: AuthorServerModel[];
  original_works?: OriginalWorkServerModel[];
}
