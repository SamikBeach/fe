import { FilterType } from './models';

export const filterLabelMap: Record<string, string> = {
  [FilterType.Era]: 'Era',
  [FilterType.Education]: 'Education',
  [FilterType.MainInterest]: 'Main Interest',
  [FilterType.Nationality]: 'Nationality',
  [FilterType.Region]: 'Region',
  [FilterType.School]: 'School',
  [FilterType.Author]: 'Author',
  [FilterType.Writing]: 'Writing',
};
