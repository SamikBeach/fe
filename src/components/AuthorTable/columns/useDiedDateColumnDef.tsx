import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { getBornDateText } from '@utils/author';
import { useMemo } from 'react';
import ColumnHeader from '../ColumnHeader';
import { SortType } from '@models/sort';

export default function useDiedDateColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'diedDate',
      size: 156,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.DiedDate} />,
      cell: row =>
        getBornDateText({
          bornDate: row.getValue().died_date,
          bornDateIsBc: row.getValue().died_date_is_bc === 1,
        }),
    };
  }, []);

  return column;
}
