import useEditionsColumnDef from './useEditionsColumnDef';
import usePublicationDateColumnDef from './usePublicationDateColumnDef';
import useTitleColumnDef from './useTitleColumnDef';

export default function useColumnDefs() {
  const titleColumnDef = useTitleColumnDef();
  const publicationDateColumnDef = usePublicationDateColumnDef();
  const editionsColumnDef = useEditionsColumnDef();

  return [titleColumnDef, publicationDateColumnDef, editionsColumnDef];
}
