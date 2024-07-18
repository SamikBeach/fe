import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export default function useNationalityColumnDef() {
  const column = useMemo<ColumnDef<AuthorServerModel>>(() => {
    return {
      id: 'nationality',
      header: 'Nationality',
      size: 140,
      accessorFn: row => row.nationality?.nationality,
    };
  }, []);

  return column;
}
