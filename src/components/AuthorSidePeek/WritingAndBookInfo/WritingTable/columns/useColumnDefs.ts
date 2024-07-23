import { Dispatch, SetStateAction } from 'react';
import useEditionsColumnDef from './useEditionsColumnDef';
import usePublicationDateColumnDef from './usePublicationDateColumnDef';
import useTitleColumnDef from './useTitleColumnDef';
import { Sort } from '@models/sort';

interface Props {
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
}

export default function useColumnDefs({
  setSelectedWritingId,
  sort,
  setSort,
}: Props) {
  const titleColumnDef = useTitleColumnDef({
    setSelectedWritingId,
    sort,
    setSort,
  });
  const publicationDateColumnDef = usePublicationDateColumnDef({
    sort,
    setSort,
  });
  const editionsColumnDef = useEditionsColumnDef({
    setSelectedWritingId,
  });

  return [titleColumnDef, publicationDateColumnDef, editionsColumnDef];
}
