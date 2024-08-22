import useAuthorColumnDef from './useAuthorColumnDef';
import useEditionsColumnDef from './useEditionsColumnDef';
import usePublicationDateColumnDef from './usePublicationDateColumnDef';
import useTitleColumnDef from './useTitleColumnDef';
import useTitleInKorColumnDef from './useTitleInKorColumnDef';

export default function useColumnDefs() {
  const titleColumnDef = useTitleColumnDef();
  const titleInKorColumnDef = useTitleInKorColumnDef();
  const authorColumnDef = useAuthorColumnDef();
  const publicationDateColumnDef = usePublicationDateColumnDef();
  const editionsColumnDef = useEditionsColumnDef();

  return [
    titleColumnDef,
    titleInKorColumnDef,
    authorColumnDef,
    publicationDateColumnDef,
    editionsColumnDef,
  ];
}
