import { SelectItem } from '@models/common';

export enum FilterType {
  Era = 'era',
  Education = 'education',
  MainInterest = 'main-interest',
  Nationality = 'nationality',
  Region = 'region',
  School = 'school',
}

export interface Filter {
  [FilterType.Era]: SelectItem[];
  [FilterType.Education]: SelectItem[];
  [FilterType.MainInterest]: SelectItem[];
  [FilterType.Nationality]: SelectItem[];
  [FilterType.Region]: SelectItem[];
  [FilterType.School]: SelectItem[];
}
