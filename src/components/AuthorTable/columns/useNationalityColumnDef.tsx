import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import ColumnHeader from '../ColumnHeader';
import { SortType } from '@models/sort';

export default function useNationalityColumnDef() {
  const column = useMemo<ColumnDef<AuthorServerModel>>(() => {
    return {
      id: 'nationality',
      size: 140,
      header: () => <ColumnHeader type={SortType.Nationality} />,
      accessorFn: row => row.nationality?.nationality,
    };
  }, []);

  return column;
}
