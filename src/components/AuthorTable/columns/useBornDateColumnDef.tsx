import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { getBornDateText } from '@utils/author';
import { useMemo } from 'react';
import ColumnHeader from '../ColumnHeader';
import { SortType } from '@models/sort';

export default function useBornDateColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'bornDate',
      size: 156,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.BornDate} />,
      cell: row =>
        getBornDateText({
          bornDate: row.getValue().born_date,
          bornDateIsBc: row.getValue().born_date_is_bc === 1,
        }),
    };
  }, []);

  return column;
}
