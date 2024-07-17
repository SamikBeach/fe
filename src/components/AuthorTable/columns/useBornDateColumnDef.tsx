import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { getBornDateText } from '@utils/author';

export default function useBornDateColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'bornDate',
    header: 'Born date',
    size: 156,
    accessorFn: row => row,
    cell: row =>
      getBornDateText({
        bornDate: row.getValue().born_date,
        bornDateIsBc: row.getValue().born_date_is_bc === 1,
      }),
  };
}
