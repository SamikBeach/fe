import { Dispatch, SetStateAction } from 'react';
import useEditionsColumnDef from './useEditionsColumnDef';
import usePublicationDateColumnDef from './usePublicationDateColumnDef';
import useTitleColumnDef from './useTitleColumnDef';

interface Props {
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
}

export default function useColumnDefs({ setSelectedWritingId }: Props) {
  const titleColumnDef = useTitleColumnDef({ setSelectedWritingId });
  const publicationDateColumnDef = usePublicationDateColumnDef();
  const editionsColumnDef = useEditionsColumnDef({ setSelectedWritingId });

  return [titleColumnDef, publicationDateColumnDef, editionsColumnDef];
}
