import useDiedDateColumnDef from './useDiedDateColumnDef';
import useEducationColumnDef from './useEducationColumnDef';
import useEraColumnDef from './useEraColumnDef';
import useInfluencedByColumnDef from './useInfluencedByColumnDef';
import useInfluencedColumnDef from './useInfluencedColumnDef';
import useMainInterestColumnDef from './useMainInterestColumnDef';
import useNameColumnDef from './useNameColumnDef';
import useNationalityColumnDef from './useNationalityColumnDef';
import useRegionColumnDef from './useRegionColumnDef';
import useSchoolColumnDef from './useSchoolColumnDef';
import useBornDateColumnDef from './useBornDateColumnDef';

export default function useColumnDefs() {
  const nameColumnDef = useNameColumnDef();
  const schoolColumnDef = useSchoolColumnDef();
  const regionColumnDef = useRegionColumnDef();
  const mainInterestColumnDef = useMainInterestColumnDef();
  const nationalityColumnDef = useNationalityColumnDef();
  const influencedColumnDef = useInfluencedColumnDef();
  const influencedByColumnDef = useInfluencedByColumnDef();
  const eraColumnDef = useEraColumnDef();
  const educationColumnDef = useEducationColumnDef();
  const diedDateColumnDef = useDiedDateColumnDef();
  const bornDateColumnDef = useBornDateColumnDef();

  return [
    nameColumnDef,
    bornDateColumnDef,
    diedDateColumnDef,
    nationalityColumnDef,
    eraColumnDef,
    regionColumnDef,
    educationColumnDef,
    mainInterestColumnDef,
    schoolColumnDef,
    influencedColumnDef,
    influencedByColumnDef,
  ];
}
