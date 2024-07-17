import getBornDateColumnDef from './getBornDateColumnDef';
import getDiedDateColumnDef from './getDiedDateColumnDef';
import getEducationColumnDef from './getEducationColumnDef';
import getEraColumnDef from './getEraColumnDef';
import getInfluencedByColumnDef from './getInfluencedByColumnDef';
import getInfluencedColumnDef from './getInfluencedColumnDef';
import getMainInterestColumnDef from './getMainInterestColumnDef';
import getNameColumnDef from './getNameColumnDef';
import getNationalityColumnDef from './getNationalityColumnDef';
import getRegionColumnDef from './getRegionColumnDef';
import getSchoolColumnDef from './getSchoolColumnDef';

export const columns = [
  getNameColumnDef(),
  getBornDateColumnDef(),
  getDiedDateColumnDef(),
  getNationalityColumnDef(),
  getEraColumnDef(),
  getRegionColumnDef(),
  getEducationColumnDef(),
  getMainInterestColumnDef(),
  getSchoolColumnDef(),
  getInfluencedColumnDef(),
  getInfluencedByColumnDef(),
];
